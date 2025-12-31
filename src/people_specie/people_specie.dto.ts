import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PeopleSpecieDto {
  @ApiProperty({ description: 'ID of the person', example: 5 })
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  persone_id: number;

  @ApiProperty({ description: 'ID of the specie', example: 2 })
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  specie_id: number;
}
