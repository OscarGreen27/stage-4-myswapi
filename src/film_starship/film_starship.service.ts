import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmStarshipEntity } from './film_starship.entity';
import { FilmStarshipDto } from './film_starship.dto';

@Injectable()
export class FilmStarshipService {
  constructor(@InjectRepository(FilmStarshipEntity) private filmSpecieRepository: Repository<FilmStarshipEntity>) {}

  async create(data: FilmStarshipDto) {
    return await this.filmSpecieRepository.save(data);
  }

  async delete(data: FilmStarshipDto) {
    const result = await this.filmSpecieRepository.delete(data);
    return result.affected !== 0;
  }
}
