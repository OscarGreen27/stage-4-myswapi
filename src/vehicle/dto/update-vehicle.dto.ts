import { IsString, IsOptional, MaxLength, IsArray } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateVehicleDto {
  @ApiPropertyOptional({ example: 'Millennium Falcon', description: 'Name of the vehicle' })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  name: string;

  @ApiPropertyOptional({ example: 'YT-1300 light freighter', description: 'Model of the vehicle' })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  model: string;

  @ApiPropertyOptional({ example: 'Corellian Engineering Corporation', description: 'Manufacturer of the vehicle' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  manufacturer: string;

  @ApiPropertyOptional({ example: '100000', description: 'Cost in credits', type: String })
  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsOptional()
  @IsString()
  @MaxLength(15)
  cost_in_credits: string;

  @ApiPropertyOptional({ example: '34.37', description: 'Length in meters', type: String })
  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  length: string;

  @ApiPropertyOptional({ example: '1050', description: 'Maximum speed in atmosphere', type: String })
  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  max_atmosphering_speed: string;

  @ApiPropertyOptional({ example: '4', description: 'Crew size', type: String })
  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  crew: string;

  @ApiPropertyOptional({ example: '6', description: 'Number of passengers', type: String })
  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  passengers: string;

  @ApiPropertyOptional({ example: '100000', description: 'Cargo capacity in kilograms', type: String })
  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsString()
  @MaxLength(24)
  cargo_capacity: string;

  @ApiPropertyOptional({ example: '2 months', description: 'Maximum duration of consumables', type: String })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  consumables: string;

  @ApiPropertyOptional({ example: 'Light freighter', description: 'Class of the vehicle', type: String })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  vehicle_class: string;

  @IsOptional()
  @IsArray()
  images: string[];
}
