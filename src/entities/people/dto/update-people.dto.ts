import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { MaxLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class UpdatePeopleDto {
  @IsOptional()
  @IsString()
  @MaxLength(24)
  name: string;

  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsOptional()
  @IsString()
  height: string;

  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsOptional()
  @IsString()
  mass: string;

  @IsOptional()
  @IsString()
  @MaxLength(24)
  hair_color: string;

  @IsOptional()
  @IsString()
  @MaxLength(24)
  skin_color: string;

  @IsOptional()
  @IsString()
  @MaxLength(24)
  eye_color: string;

  @IsOptional()
  @IsString()
  @MaxLength(24)
  birth_year: string;

  @IsOptional()
  @IsString()
  @MaxLength(24)
  gender: string;

  @IsOptional()
  @IsNumber()
  homeworld_id: number;

  @IsOptional()
  @IsArray()
  images: string[];
}
