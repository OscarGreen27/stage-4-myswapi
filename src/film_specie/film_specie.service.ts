import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmSpecieEntity } from './film_specie.entity';
import { FilmSpecieDto } from './film_specie.dto';

@Injectable()
export class FilmSpecieService {
  constructor(@InjectRepository(FilmSpecieEntity) private filmSpecieRepository: Repository<FilmSpecieEntity>) {}

  async create(data: FilmSpecieDto) {
    return await this.filmSpecieRepository.save(data);
  }

  async delete(data: FilmSpecieDto) {
    const result = await this.filmSpecieRepository.delete(data);
    return result.affected !== 0;
  }
}
