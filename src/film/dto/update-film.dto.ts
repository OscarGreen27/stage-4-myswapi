import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { CreateFilmDto } from './create-film.dto';

export class UpdateFilmDto extends PartialType(CreateFilmDto) {
  @ApiPropertyOptional({ description: 'Population count', example: ['image-1-name', 'image-2-name'] })
  @IsOptional()
  @IsArray()
  images: string[];
}
