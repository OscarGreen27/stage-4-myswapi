import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecieService } from './specie.service';
import { Specie } from './specie.entity';
import { SpecieController } from './specie.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Specie])],
  controllers: [SpecieController],
  providers: [SpecieService],
  exports: [SpecieService, TypeOrmModule],
})
export class SpecieModule {}
