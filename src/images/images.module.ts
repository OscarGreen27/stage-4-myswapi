import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';

import { FilmModule } from 'src/entities/film/film.module';
import { PeopleModule } from 'src/entities/people/people.module';
import { PlanetModule } from 'src/entities/planet/planet.module';
import { SpecieModule } from 'src/entities/specie/specie.module';
import { StarshipModule } from 'src/entities/starship/starship.module';
import { VehicleModule } from 'src/entities/vehicle/vehicle.module';
import { S3Service } from './s3.service';
import { ImagesService } from './images.service';

@Module({
  imports: [FilmModule, PeopleModule, PlanetModule, SpecieModule, StarshipModule, VehicleModule],
  controllers: [ImagesController],
  providers: [S3Service, ImagesService],
})
export class ImagesModule {}
