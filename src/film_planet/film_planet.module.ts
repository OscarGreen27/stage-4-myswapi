import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmPlanetEntity } from './film_planet.entity';
import { FilmPlanetService } from './film_planet.service';
import { FilmPlanetController } from './film_planet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FilmPlanetEntity])],
  providers: [FilmPlanetService],
  exports: [FilmPlanetService, TypeOrmModule],
  controllers: [FilmPlanetController],
})
export class FilmPlanetModule {}
