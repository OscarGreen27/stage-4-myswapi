import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleModule } from 'src/entities/people/people.module';
import { People } from './entities/people/people.entity';
import { FilmModule } from './film/film.module';
import { Films } from './film/film.entity';
import { PlanetModule } from './entities/planet/planet.module';
import { SpecieModule } from './entities/specie/specie.module';
import { StarshipModule } from './entities/starship/starship.module';
import { VehicleModule } from './entities/vehicle/vehicle.module';
import { Species } from './entities/specie/specie.entity';
import { Starships } from './entities/starship/starship.entity';
import { Vehicles } from './entities/vehicle/vehicle.entity';
import { Planets } from './entities/planet/planet.entity';
import { ImagesModule } from './images/images.module';
import { FilmCharacterEntity } from './entities/film_character/fillm_character.entity';
import { FilmPlanetEntity } from './entities/film_planet/film_planet.entity';
import { FilmSpecieEntity } from './entities/film_specie/film_specie.entity';
import { FilmCharacterModule } from './entities/film_character/film_character.module';
import { FilmPlanetModule } from './entities/film_planet/film_planet.module';
import { FilmSpecieModule } from './entities/film_specie/film_specie.module';
import { FilmStarshipModule } from './entities/film_starship/film_starship.module';
import { FilmVehicleEntity } from './entities/film_vehicle/film_vehicle.entity';
import { FilmStarshipEntity } from './entities/film_starship/film_starship.entity';
import { PeopleSpecieEntity } from './entities/people_specie/people_specie.entity';
import { PeopleStarshipEntity } from './entities/people_starship/people_starship.entity';
import { PeopleStarshipModule } from './entities/people_starship/people_starship.module';
import { PeopleVehicleModule } from './entities/people_vehicle/people_vehicle.module';
import { PeopleVehicleEntity } from './entities/people_vehicle/people_vehicle.entity';
import { PlanetResidentModule } from './entities/planest_resident/planet_resident.module';
import { PlanetResidentEntity } from './entities/planest_resident/planet_resident.entity';
import { PeopleSpecieModule } from './entities/people_specie/people_specie.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './exception_filter/all-exception.filter';
import { UserEntity } from './entities/user/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FilmVehicleModule } from './entities/film_vehicle/film_vehicle.module';

@Module({
  imports: [
    PeopleModule,
    FilmModule,
    PlanetModule,
    SpecieModule,
    StarshipModule,
    VehicleModule,
    ImagesModule,
    FilmCharacterModule,
    FilmPlanetModule,
    FilmSpecieModule,
    FilmStarshipModule,
    FilmVehicleModule,
    PeopleSpecieModule,
    PeopleStarshipModule,
    PeopleVehicleModule,
    PlanetResidentModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'host.docker.internal'),
        port: configService.get<number>('DB_PORT', 3333),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres'),
        database: configService.get('DB_NAME', 'starwars'),
        entities: [
          People,
          Films,
          Planets,
          Species,
          Starships,
          Vehicles,
          FilmCharacterEntity,
          FilmPlanetEntity,
          FilmSpecieEntity,
          FilmStarshipEntity,
          FilmVehicleEntity,
          PeopleSpecieEntity,
          PeopleStarshipEntity,
          PeopleVehicleEntity,
          PlanetResidentEntity,
          UserEntity,
        ],
        synchronize: false,
      }),
    }),
    AuthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
