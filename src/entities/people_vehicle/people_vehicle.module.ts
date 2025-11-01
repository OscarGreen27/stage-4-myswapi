import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleVehicleEntity } from './people_vehicle.entity';
import { PeopleVehicleService } from './people_vehicle.service';
import { PeopleVehicleController } from './people_vehicle.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PeopleVehicleEntity])],
  providers: [PeopleVehicleService],
  exports: [PeopleVehicleService, TypeOrmModule],
  controllers: [PeopleVehicleController],
})
export class PeopleVehicleModule {}
