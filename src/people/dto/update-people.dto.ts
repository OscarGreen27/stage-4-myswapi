import { IsArray, IsOptional } from 'class-validator';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreatePeopleDto } from './create-people.dto';

export class UpdatePeopleDto extends PartialType(CreatePeopleDto) {
  @ApiPropertyOptional({ description: 'Population count', example: ['image-1-name', 'image-2-name'] })
  @IsOptional()
  @IsArray()
  images: string[];
}
