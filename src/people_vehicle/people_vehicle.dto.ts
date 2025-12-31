import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PeopleVehicleDto {
  @ApiProperty({ description: 'ID of the person', example: 8 })
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  persone_id: number;

  @ApiProperty({ description: 'ID of the vehicle', example: 4 })
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  vehicle_id: number;
}
