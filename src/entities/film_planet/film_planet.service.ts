import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmPlanetEntity } from './film_planet.entity';
import { FilmPlanetDto } from './film_planet.dto';

@Injectable()
export class FilmPlanetService {
  constructor(@InjectRepository(FilmPlanetEntity) private filmPlanetRepository: Repository<FilmPlanetEntity>) {}

  async create(data: FilmPlanetDto) {
    return await this.filmPlanetRepository.save(data);
  }

  async delete(data: FilmPlanetDto) {
    const result = await this.filmPlanetRepository.delete(data);
    return result.affected !== 0;
  }
}
