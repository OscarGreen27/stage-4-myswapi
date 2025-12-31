import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class UpdatePlanetDto {
  @ApiPropertyOptional({ description: 'Name of the planet', example: 'Tatooine' })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  name: string;

  @ApiPropertyOptional({ description: 'Rotation period in hours', example: '23' })
  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsOptional()
  @IsString()
  @MaxLength(7)
  rotation_period: string;

  @ApiPropertyOptional({ description: 'Orbital period in days', example: '304' })
  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsOptional()
  @IsString()
  @MaxLength(7)
  orbital_period: string;

  @ApiPropertyOptional({ description: 'Planet diameter in km', example: '10465' })
  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsOptional()
  @IsString()
  @MaxLength(7)
  diameter: string;

  @ApiPropertyOptional({ description: 'Climate type', example: 'arid' })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  climate: string;

  @ApiPropertyOptional({ description: 'Gravity', example: '1 standard' })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  gravity: string;

  @ApiPropertyOptional({ description: 'Terrain type', example: 'desert' })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  terrain: string;

  @ApiPropertyOptional({ description: 'Surface water percentage', example: '1' })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  surface_water: string;

  @ApiPropertyOptional({ description: 'Population count', example: '200000' })
  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsString()
  @MaxLength(10)
  population: string;

  @IsOptional()
  @IsArray()
  images: string[];
}
