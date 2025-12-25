import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmController } from './film.controller';
import { Films } from './film.entity';
import { FilmService } from './film.service';

@Module({
  imports: [TypeOrmModule.forFeature([Films])],
  controllers: [FilmController],
  providers: [FilmService],
  exports: [FilmService, TypeOrmModule],
})
export class FilmModule {}
