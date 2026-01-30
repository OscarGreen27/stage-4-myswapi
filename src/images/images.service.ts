import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './image.entity';

@Injectable()
export class ImagesService {
  constructor(@InjectRepository(Image) private imageRepository: Repository<Image>) {}

  async getAll(id: number, entityType: string) {
    const result = await this.imageRepository.find({ where: { entity_id: id, entity_type: entityType } });
    return result;
  }

  async deleteOne(id: number, entityType: string, url: string) {
    const result = await this.imageRepository.remove({ entity_id: id, entity_type: entityType, image_url: url });
    return result;
  }

  async addOne(id: number, entityType: string, url: string) {
    const newImage = this.imageRepository.create({ entity_id: id, entity_type: entityType, image_url: url });
    try {
      await this.imageRepository.save(newImage);
      return true;
    } catch (err) {
      console.error(err);
    }
  }
}
