import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planets } from './planet.entity';
import { PlanetController } from './planet.controller';
import { PlanetService } from './planet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Planets])],
  controllers: [PlanetController],
  providers: [PlanetService],
  exports: [PlanetService, TypeOrmModule],
})
export class PlanetModule {}
