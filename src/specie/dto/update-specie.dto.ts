import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateSpecieDto } from './create-specie.dto';
import { IsArray, IsOptional } from 'class-validator';
export class UpdateSpecieDto extends PartialType(CreateSpecieDto) {
  @ApiPropertyOptional({ description: 'Population count', example: ['image-1-name', 'image-2-name'] })
  @IsOptional()
  @IsArray()
  images: string[];
}
