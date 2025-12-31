import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecieService } from './specie.service';
import { Species } from './specie.entity';
import { SpecieController } from './specie.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Species])],
  controllers: [SpecieController],
  providers: [SpecieService],
  exports: [SpecieService, TypeOrmModule],
})
export class SpecieModule {}
