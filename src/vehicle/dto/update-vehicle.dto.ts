import { IsOptional, IsArray } from 'class-validator';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateVehicleDto } from './create-vehicle.dto';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
  @ApiPropertyOptional({ description: 'Population count', example: ['image-1-name', 'image-2-name'] })
  @IsOptional()
  @IsArray()
  images: string[];
}
