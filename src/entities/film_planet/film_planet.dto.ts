import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FilmPlanetDto {
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  film_id: number;

  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  planet_if: number;
}
