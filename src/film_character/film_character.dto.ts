import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FilmsCharacterDto {
  @ApiProperty({ description: 'ID of the film', example: 5 })
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  film_id: number;

  @ApiProperty({ description: 'ID of the character', example: 14 })
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  character_id: number;
}
