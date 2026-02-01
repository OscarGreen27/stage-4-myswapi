import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmCharacterEntity } from './fillm_character.entity';

@Injectable()
export class FilmsCharactersService {
  constructor(@InjectRepository(FilmCharacterEntity) private filmCharacterRepository: Repository<FilmCharacterEntity>) {}

  async create(filmChrarcter: FilmCharacterEntity) {
    return await this.filmCharacterRepository.save(filmChrarcter);
  }

  async delete(FilmCharacter: FilmCharacterEntity) {
    const result = await this.filmCharacterRepository.delete(FilmCharacter);
    return result.affected !== 0;
  }
}
