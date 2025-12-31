import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
export class FilmSpecieDto {
  @ApiProperty({ description: 'ID of the film', example: 5 })
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  film_id: number;

  @ApiProperty({ description: 'ID of the specie', example: 3 })
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  specie_id: number;
}
