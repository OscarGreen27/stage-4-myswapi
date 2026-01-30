import { Controller, UseInterceptors, UploadedFile, Post, Param, ParseIntPipe, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

import { S3Service } from './s3.service';
import { ImagesService } from './images.service';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { RoleGuard } from 'src/auth/guards/role.guards';

@ApiBearerAuth()
@UseGuards(AuthGuard, RoleGuard)
@Controller('images')
export class ImagesController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly imagesService: ImagesService,
  ) {}

  @Post('/upload/:type/:id')
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary', description: 'Image file to upload' },
      },
      required: ['file'],
    },
  })
  @ApiOperation({
    summary: 'Upload an image',
    description: 'Uploads an image for a specific entity (film, starship, etc.) and saves the link in DB. Admin only',
  })
  @ApiParam({ name: 'type', description: 'Entity type (e.g., "films", "starships")' })
  @ApiParam({ name: 'id', description: 'Entity ID' })
  @Roles(Role.Admin)
  async uploadImage(@Param('id', ParseIntPipe) id: number, @Param('type') type: string, @UploadedFile() file: Express.Multer.File) {
    // if (!file) {
    //   throw new NotFoundException('File not transferred!');
    // }
    const url = await this.s3Service.uploadFile(file, type, id);
    const dbSaveResult = await this.imagesService.addOne(id, type, url);
    const result = dbSaveResult ? true : false;

    // const existStatus = await this.imagesService.checkExisting(id, type);
    // if (!existStatus) {
    //   throw new NotFoundException(`Film with id ${id} is note exist!`);
    // }

    // const url = await this.s3Service.uploadFile(file, type, id);
    // const saveResult = await this.imagesService.saveToDb(id, type, url);
    // if (!saveResult) {
    //   return { ok: false };
    // }
    return { ok: result, url };
  }

  // @Get('/:type/:id')
  // @ApiOperation({ summary: 'Get images', description: 'Returns all image URLs for a specific entity. Admin only' })
  // @ApiParam({ name: 'type', description: 'Entity type (e.g., "films", "starships")' })
  // @ApiParam({ name: 'id', description: 'Entity ID' })
  // @Roles(Role.Admin, Role.User)
  // async getImages(@Param('type') type: string, @Param('id', ParseIntPipe) id: number) {
  //   return await this.imagesService.getEntityImagesByType(type, id);
  // }

  // @Delete('/:type/:id/:fileUrl')
  // @ApiOperation({ summary: 'Delete an image', description: 'Deletes an image from S3 and removes its link from DB' })
  // @ApiParam({ name: 'type', description: 'Entity type (e.g., "films", "starships")' })
  // @ApiParam({ name: 'id', description: 'Entity ID' })
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: { url: { type: 'string', description: 'Image URL to delete' } },
  //     required: ['url'],
  //     example: { url: 'https://s3.bucket/path/image1.jpg' },
  //   },
  // })
  // @Roles(Role.Admin)
  // async deleteImage(@Param('type') type: string, @Param('id', ParseIntPipe) id: number, @Body('url') url: string) {
  //   if (!url) {
  //     throw new NotFoundException('Image URL must be provide in body!');
  //   }
  //   const images = await this.imagesService.getEntityImagesByType(type, id);

  //   if (!images.includes(url)) {
  //     throw new NotFoundException('The image link passed does not belong to this entity!');
  //   }

  //   const key = this.imagesService.extractS3KeyFromUrl(url);

  //   await this.s3Service.deleteFile(key);

  //   const filtredImages = images.filter((img) => img != url);

  //   console.log(filtredImages);

  //   await this.imagesService.updateEntityImages(id, type, filtredImages);

  //   return { ok: true, deletedUrl: url };
  // }
}
