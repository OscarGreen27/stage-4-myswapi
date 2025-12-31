import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StarshipController } from './starship.controller';
import { Starships } from './starship.entity';
import { StarshipService } from './starship.service';

@Module({
  imports: [TypeOrmModule.forFeature([Starships])],
  controllers: [StarshipController],
  providers: [StarshipService],
  exports: [StarshipService, TypeOrmModule],
})
export class StarshipModule {}
