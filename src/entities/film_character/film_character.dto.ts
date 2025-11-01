import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class FilmsCharacterDto {
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  film_id: number;

  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  character_id: number;
}
