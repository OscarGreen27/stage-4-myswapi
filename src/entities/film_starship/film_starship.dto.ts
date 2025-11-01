import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FilmStarshipDto {
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  film_id: number;

  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  starship_id: number;
}
