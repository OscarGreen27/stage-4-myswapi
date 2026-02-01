import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './image.entity';
import { S3Service } from './s3.service';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image) private imageRepository: Repository<Image>,
    private s3Servece: S3Service,
  ) {}

  async getAll(id: number, entityType: string) {
    try {
      const result = await this.imageRepository.find({ where: { entity_id: id, entity_type: entityType } });
      return result;
    } catch (err) {
      console.error('Error catched:', err);
    }
  }

  async upload(entityId: number, entityType: string, file: Express.Multer.File) {
    const peyload = await this.saveToBucket(entityId, entityType, file);

    const newImage = this.imageRepository.create({ entity_id: entityId, entity_type: entityType, image_url: peyload['url'], key: peyload['key'] });
    try {
      const result = await this.imageRepository.save(newImage);
      return result;
    } catch (err) {
      console.error('Error catched: ', err);
    }
  }
  async delete(key: string) {
    try {
      const bucketDelete = await this.deleteFromBuckert(key);
      const dbDelete = await this.imageRepository.delete({ key: key });

      return {
        deleted_from_db: dbDelete ? true : false,
        deleted_from_bucket: bucketDelete ? true : false,
      };
    } catch (err) {
      console.error('Error catched:', err);
    }
  }

  //---------- private hethods ----------
  private saveToBucket(id: number, type: string, file: Express.Multer.File) {
    return this.s3Servece.uploadImage(id, type, file);
  }

  private deleteFromBuckert(key: string) {
    return this.s3Servece.deleteImage(key);
  }
}
