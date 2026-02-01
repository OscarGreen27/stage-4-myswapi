import { Module } from '@nestjs/common';
import { ImageController } from './images.controller';

import { S3Service } from './s3.service';
import { ImageService } from './images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [ImageController],
  providers: [S3Service, ImageService],
})
export class ImagesModule {}
