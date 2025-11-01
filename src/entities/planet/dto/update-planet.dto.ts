import { IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
export class UpdatePlanetDto {
  @IsOptional()
  @IsString()
  @MaxLength(24)
  name: string;

  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsOptional()
  @IsString()
  @MaxLength(7)
  rotation_period: string;

  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsOptional()
  @IsString()
  @MaxLength(7)
  orbital_period: string;

  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsOptional()
  @IsString()
  @MaxLength(7)
  diameter: string;

  @IsOptional()
  @IsString()
  @MaxLength(24)
  climate: string;

  @IsOptional()
  @IsString()
  @MaxLength(24)
  gravity: string;

  @IsOptional()
  @IsString()
  @MaxLength(24)
  terrain: string;

  @IsOptional()
  @IsString()
  @MaxLength(24)
  surface_water: string;

  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsString()
  @MaxLength(10)
  population: string;
}
