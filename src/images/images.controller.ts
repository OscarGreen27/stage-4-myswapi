import {
  Controller,
  UseInterceptors,
  UploadedFile,
  Post,
  Param,
  NotFoundException,
  ParseIntPipe,
  Get,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

import { S3Service } from './s3.service';
import { ImagesService } from './images.service';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { RoleGuard } from 'src/auth/guards/role.guards';

/**
 *images endpoint request handler class
 */
@ApiBearerAuth()
@UseGuards(AuthGuard, RoleGuard)
@Controller('images')
export class ImagesController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly imagesService: ImagesService,
  ) {}

  /**
   * function handler for post method to add images.
   * uses interceptor to get image from request.
   * received image is stored in memory, then sent to AWS bucket,
   * link which returns and ves is stored in database
   * @param id entity id
   * @param type entity type
   * @param file file attached to the request
   * @returns
   */
  @Post('/upload/:type/:id')
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @Roles(Role.Admin)
  async uploadImage(@Param('id', ParseIntPipe) id: number, @Param('type') type: string, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new NotFoundException('File not transferred!');
    }

    const existStatus = await this.imagesService.checkExisting(id, type);
    if (!existStatus) {
      throw new NotFoundException(`Film with id ${id} is note exist!`);
    }

    const url = await this.s3Service.uploadFile(file, type, id);
    const saveResult = await this.imagesService.saveToDb(id, type, url);
    if (!saveResult) {
      return { ok: false };
    }
    return { ok: true, url };
  }

  /**
   * get request handler function
   * @param type entity type
   * @param id entity id
   * @returns array of images links
   */
  @Get('/:type/:id')
  @Roles(Role.Admin, Role.User)
  async getImages(@Param('type') type: string, @Param('id', ParseIntPipe) id: number) {
    const result = await this.imagesService.getEntityByType(type, id);
    if (!result || !result.images) {
      throw new NotFoundException('Entity is not found or images array is null!');
    }
    return result.images;
  }

  /**
   * function handler method delete.
   * deletes the image from the AWS bucket and removes the link to the image from the bd array
   * @param type entity type
   * @param id entyti id
   * @param url images url
   * @returns object with status and deleted link
   */
  @Delete('/:type/:id/:fileUrl')
  @ApiBody({ type: String })
  @Roles(Role.Admin)
  async deleteImage(@Param('type') type: string, @Param('id', ParseIntPipe) id: number, @Body('url') url: string) {
    if (!url) {
      throw new NotFoundException('Image URL must be provide in body!');
    }
    const entity = await this.imagesService.getEntityByType(type, id);
    if (!entity || !entity.images) {
      throw new NotFoundException('Entity is not found or images array is null!');
    }

    const hasImage = entity.images.includes(url);
    if (!hasImage) {
      throw new NotFoundException('The image link passed does not belong to this entity!');
    }

    const key = this.imagesService.extractS3KeyFromUrl(url);

    await this.s3Service.deleteFile(key);

    entity.images = entity.images.filter((img) => img != url);

    await this.imagesService.updateEntityByType(type, id, entity);

    return { ok: true, deletedUrl: url };
  }
}
