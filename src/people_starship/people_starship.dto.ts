import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PeopleStarshipDto {
  @ApiProperty({ description: 'ID of the person', example: 7 })
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  persone_id: number;

  @ApiProperty({ description: 'ID of the starship', example: 3 })
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  starship_id: number;
}
