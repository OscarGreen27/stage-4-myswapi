import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FilmVehicleDto {
  @ApiProperty({ description: 'ID of the film', example: 5 })
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  film_id: number;

  @ApiProperty({ description: 'ID of the vehicle', example: 12 })
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  vehicle_id: number;
}
