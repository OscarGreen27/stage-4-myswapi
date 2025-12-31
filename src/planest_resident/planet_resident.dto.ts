import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PlanetResidentDto {
  @ApiProperty({ description: 'ID of the planet', example: 3 })
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  planet_id: number;

  @ApiProperty({ description: 'ID of the resident', example: 5 })
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  resident_id: number;
}
