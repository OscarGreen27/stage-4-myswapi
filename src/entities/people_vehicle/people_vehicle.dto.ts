import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PeopleVehicleDto {
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  persone_id: number;

  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  vehicle_id: number;
}
