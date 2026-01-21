import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmVehicleEntity } from './film_vehicle.entity';
import { FilmVehicleService } from './film_vehicle.service';
import { FilmVehicleController } from './film_vehicle.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FilmVehicleEntity])],
  providers: [FilmVehicleService],
  exports: [FilmVehicleService, TypeOrmModule],
  controllers: [FilmVehicleController],
})
export class FilmVehicleModule {}
