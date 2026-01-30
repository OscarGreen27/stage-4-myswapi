import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';

import { S3Service } from './s3.service';
import { ImagesService } from './images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [ImagesController],
  providers: [S3Service, ImagesService],
})
export class ImagesModule {}
