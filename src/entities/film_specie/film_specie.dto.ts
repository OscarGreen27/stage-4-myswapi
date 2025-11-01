import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
export class FilmSpecieDto {
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  film_id: number;

  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  specie_id: number;
}
