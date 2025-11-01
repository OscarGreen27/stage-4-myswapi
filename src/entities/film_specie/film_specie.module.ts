import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmSpecieService } from './film_specie.service';
import { FilmSpecieEntity } from './film_specie.entity';
import { FilmSpecieController } from './film_specie.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FilmSpecieEntity])],
  providers: [FilmSpecieService],
  exports: [FilmSpecieService, TypeOrmModule],
  controllers: [FilmSpecieController],
})
export class FilmSpecieModule {}
