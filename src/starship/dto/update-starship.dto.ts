import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateStarshipDto {
  @ApiPropertyOptional({ description: 'Name of the starship', example: 'X-wing' })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  name: string;

  @ApiPropertyOptional({ description: 'Model of the starship', example: 'T-65 X-wing' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  model: string;

  @ApiPropertyOptional({ description: 'Manufacturer of the starship', example: 'Incom Corporation' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  manufacturer: string;

  @ApiPropertyOptional({ description: 'Cost in credits', example: '149999' })
  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsOptional()
  @IsString()
  @MaxLength(15)
  cost_in_credits: string;

  @ApiPropertyOptional({ description: 'Length of the starship', example: '12.5' })
  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsOptional()
  @IsString()
  length: string;

  @ApiPropertyOptional({ description: 'Maximum atmosphering speed', example: '1050' })
  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsOptional()
  @IsString()
  max_atmosphering_speed: string;

  @ApiPropertyOptional({ description: 'Number of crew members', example: '1' })
  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsOptional()
  @IsString()
  crew: string;

  @ApiPropertyOptional({ description: 'Number of passengers', example: '0' })
  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsOptional()
  @IsString()
  passengers: string;

  @ApiPropertyOptional({ description: 'Cargo capacity', example: '110' })
  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsOptional()
  @IsString()
  cargo_capacity: string;

  @ApiPropertyOptional({ description: 'Consumables', example: '1 week' })
  @IsString()
  @MaxLength(24)
  consumables: string;

  @ApiPropertyOptional({ description: 'Hyperdrive rating', example: '1.0' })
  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsOptional()
  @IsString()
  hyperdrive_rating: string;

  @ApiPropertyOptional({ description: 'MGLT (Megalight per hour)', example: '100' })
  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsOptional()
  @IsString()
  mglt: string;

  @ApiPropertyOptional({ description: 'Starship class', example: 'Starfighter' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  starship_class: string;

  @IsOptional()
  @IsArray()
  images: string[];
}
