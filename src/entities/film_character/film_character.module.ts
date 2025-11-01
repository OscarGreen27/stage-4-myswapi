import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmCharacterEntity } from './fillm_character.entity';
import { FilmsCharactersService } from './films_characters.service';
import { FilmsCharactersController } from './film_character.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FilmCharacterEntity])],
  providers: [FilmsCharactersService],
  exports: [FilmsCharactersService, TypeOrmModule],
  controllers: [FilmsCharactersController],
})
export class FilmCharacterModule {}
