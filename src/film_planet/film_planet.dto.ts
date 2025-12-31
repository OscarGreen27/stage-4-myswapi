import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FilmPlanetDto {
  @ApiProperty({ description: 'ID of the film', example: 5 })
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  film_id: number;

  @ApiProperty({ description: 'ID of the planet', example: 7 })
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  planet_id: number;
}
