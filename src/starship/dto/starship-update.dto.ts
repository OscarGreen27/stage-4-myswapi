import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateStarshipDto } from './starship-create.dto';
import { IsArray, IsOptional } from 'class-validator';

export class UpdateStarshipDto extends PartialType(CreateStarshipDto) {
  @ApiPropertyOptional({ description: 'Population count', example: ['image-1-name', 'image-2-name'] })
  @IsOptional()
  @IsArray()
  images: string[];
}
