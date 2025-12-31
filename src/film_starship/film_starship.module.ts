import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmStarshipEntity } from './film_starship.entity';
import { FilmStarshipService } from './film_starship.service';
import { FilmStarshipController } from './film_starship.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FilmStarshipEntity])],
  providers: [FilmStarshipService],
  exports: [FilmStarshipService, TypeOrmModule],
  controllers: [FilmStarshipController],
})
export class FilmStarshipModule {}
