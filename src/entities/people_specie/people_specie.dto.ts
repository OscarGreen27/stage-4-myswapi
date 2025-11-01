import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PeopleSpecieDto {
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  persone_id: number;

  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  specie_id: number;
}
