import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PlanetResidentDto {
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  planet_id: number;

  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  resident_id: number;
}
