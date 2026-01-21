import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleModule } from 'src/people/people.module';
import { People } from './people/people.entity';
import { FilmModule } from './film/film.module';
import { Films } from './film/film.entity';
import { PlanetModule } from './planet/planet.module';
import { SpecieModule } from './specie/specie.module';
import { StarshipModule } from './starship/starship.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { Species } from './specie/specie.entity';
import { Starships } from './starship/starship.entity';
import { Vehicles } from './vehicle/vehicle.entity';
import { Planets } from './planet/planet.entity';
import { ImagesModule } from './images/images.module';
import { FilmCharacterEntity } from './film_character/fillm_character.entity';
import { FilmPlanetEntity } from './film_planet/film_planet.entity';
import { FilmSpecieEntity } from './film_specie/film_specie.entity';
import { FilmCharacterModule } from './film_character/film_character.module';
import { FilmPlanetModule } from './film_planet/film_planet.module';
import { FilmSpecieModule } from './film_specie/film_specie.module';
import { FilmStarshipModule } from './film_starship/film_starship.module';
import { FilmVehicleEntity } from './film_vehicle/film_vehicle.entity';
import { FilmStarshipEntity } from './film_starship/film_starship.entity';
import { PeopleSpecieEntity } from './people_specie/people_specie.entity';
import { PeopleStarshipEntity } from './people_starship/people_starship.entity';
import { PeopleStarshipModule } from './people_starship/people_starship.module';
import { PeopleVehicleModule } from './people_vehicle/people_vehicle.module';
import { PeopleVehicleEntity } from './people_vehicle/people_vehicle.entity';
import { PlanetResidentModule } from './planest_resident/planet_resident.module';
import { PlanetResidentEntity } from './planest_resident/planet_resident.entity';
import { PeopleSpecieModule } from './people_specie/people_specie.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './exception_filter/all-exception.filter';
import { UserEntity } from './entities/user/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FilmVehicleModule } from './film_vehicle/film_vehicle.module';

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
