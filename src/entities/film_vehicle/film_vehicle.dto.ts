import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FilmVehicleDto {
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  film_id: number;

  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  vehicle_id: number;
}
