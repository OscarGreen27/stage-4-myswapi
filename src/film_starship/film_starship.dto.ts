import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FilmStarshipDto {
  @ApiProperty({ description: 'ID of the film', example: 5 })
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  film_id: number;

  @ApiProperty({ description: 'ID of the starship', example: 8 })
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  starship_id: number;
}
