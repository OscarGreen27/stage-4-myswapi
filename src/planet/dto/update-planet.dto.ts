import { IsArray, IsOptional } from 'class-validator';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreatePlanetDto } from './create-planet.dto';
export class UpdatePlanetDto extends PartialType(CreatePlanetDto) {
  @ApiPropertyOptional({ description: 'Population count', example: ['image-1-name', 'image-2-name'] })
  @IsOptional()
  @IsArray()
  images: string[];
}
