import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StarshipController } from './starship.controller';
import { Starship } from './starship.entity';
import { StarshipService } from './starship.service';

@Module({
  imports: [TypeOrmModule.forFeature([Starship])],
  controllers: [StarshipController],
  providers: [StarshipService],
  exports: [StarshipService, TypeOrmModule],
})
export class StarshipModule {}
