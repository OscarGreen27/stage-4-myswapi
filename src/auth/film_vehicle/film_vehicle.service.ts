import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmVehicleEntity } from './film_vehicle.entity';
import { FilmVehicleDto } from './film_vehicle.dto';

@Injectable()
export class FilmVehicleService {
  constructor(@InjectRepository(FilmVehicleEntity) private filmVehicleRepository: Repository<FilmVehicleEntity>) {}

  async create(data: FilmVehicleDto) {
    return await this.filmVehicleRepository.save(data);
  }

  async delete(data: FilmVehicleDto) {
    const result = await this.filmVehicleRepository.delete(data);
    return result.affected !== 0;
  }
}
