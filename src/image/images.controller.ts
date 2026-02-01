import { Controller, UseInterceptors, UploadedFile, Post, Param, ParseIntPipe, UseGuards, Get, Delete } from '@nestjs/common';

import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

import { S3Service } from './s3.service';
import { ImageService } from './images.service';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { RoleGuard } from 'src/auth/guards/role.guards';

@ApiBearerAuth()
@UseGuards(AuthGuard, RoleGuard)
@Controller('image')
export class ImageController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly imagesService: ImageService,
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
  @ApiParam({ name: 'id', description: 'Entity ID' })
  @ApiParam({ name: 'type', description: 'Entity type (e.g., "films", "starships")' })
  @Roles(Role.Admin)
  async uploadImage(@Param('id', ParseIntPipe) id: number, @Param('type') type: string, @UploadedFile() file: Express.Multer.File) {
    return await this.imagesService.upload(id, type, file);
  }

  @Get('/:type/:id')
  @ApiOperation({ summary: 'Get images', description: 'Returns all image URLs for a specific entity. Admin only' })
  @ApiParam({ name: 'id', description: 'Entity ID' })
  @ApiParam({ name: 'type', description: 'Entity type (e.g., "films", "starships")' })
  @Roles(Role.Admin, Role.User)
  async getImages(@Param('id', ParseIntPipe) id: number, @Param('type') type: string) {
    return this.imagesService.getAll(id, type);
  }

  @Delete('/delte/:key')
  @ApiOperation({ summary: 'Delete an image', description: 'Deletes an image from S3 and removes its link from DB' })
  @ApiParam({ name: 'key', description: 's3 file key', example: 'film/2/1769957895936_187668_71j4eFd2kpL._AC_UF894,1000_QL80_.jpg' })
  @Roles(Role.Admin)
  async deleteImage(@Param('key') key: string) {
    return this.imagesService.delete(key);
  }
}
