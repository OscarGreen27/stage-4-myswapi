import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetResidentEntity } from './planet_resident.entity';
import { PlanetResidentService } from './planet_resident.service';
import { PlanetResidentController } from './planet_resident.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlanetResidentEntity])],
  providers: [PlanetResidentService],
  exports: [PlanetResidentService, TypeOrmModule],
  controllers: [PlanetResidentController],
})
export class PlanetResidentModule {}
