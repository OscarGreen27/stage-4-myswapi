import { IsNumberString, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { EntityRelations } from 'src/entities/entity-relation.dto';

export class CreatePlanetDto {
  @ApiProperty({ description: 'Name of the planet', example: 'Tatooine' })
  @IsString()
  @MaxLength(24)
  name: string;

  @ApiProperty({ description: 'Rotation period in hours', example: '23' })
  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsString()
  @MaxLength(7)
  rotation_period: string;

  @ApiProperty({ description: 'Orbital period in days', example: '304' })
  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsString()
  @MaxLength(7)
  orbital_period: string;

  @ApiProperty({ description: 'Planet diameter in km', example: '10465' })
  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsString()
  @MaxLength(7)
  diameter: string;

  @ApiProperty({ description: 'Climate type', example: 'arid' })
  @IsString()
  @MaxLength(24)
  climate: string;

  @ApiProperty({ description: 'Gravity', example: '1 standard' })
  @IsString()
  @MaxLength(24)
  gravity: string;

  @ApiProperty({ description: 'Terrain type', example: 'desert' })
  @IsString()
  @MaxLength(24)
  terrain: string;

  @ApiProperty({ description: 'Surface water percentage', example: '1' })
  @IsNumberString()
  @MaxLength(24)
  surface_water: string;

  @ApiProperty({ description: 'Population count', example: '200000' })
  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsString()
  @MaxLength(10)
  population: string;

  @ApiProperty({ type: EntityRelations })
  @IsOptional()
  @ValidateNested()
  @Type(() => EntityRelations)
  relations: EntityRelations;
}
