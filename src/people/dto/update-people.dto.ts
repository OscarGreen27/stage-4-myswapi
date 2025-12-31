import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { MaxLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePeopleDto {
  @ApiPropertyOptional({ description: 'Name of the character', example: 'Leia Organa' })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  name: string;

  @ApiPropertyOptional({ description: 'Height in cm', example: '150' })
  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsOptional()
  @IsString()
  height: string;

  @ApiPropertyOptional({ description: 'Mass in kg', example: '49' })
  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsOptional()
  @IsString()
  mass: string;

  @ApiPropertyOptional({ description: 'Hair color', example: 'Brown' })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  hair_color: string;

  @ApiPropertyOptional({ description: 'Skin color', example: 'Light' })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  skin_color: string;

  @ApiPropertyOptional({ description: 'Eye color', example: 'Brown' })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  eye_color: string;

  @ApiPropertyOptional({ description: 'Birth year', example: '19BBY' })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  birth_year: string;

  @ApiPropertyOptional({ description: 'Gender', example: 'Female' })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  gender: string;

  @ApiPropertyOptional({ description: 'ID of homeworld', example: 2 })
  @IsOptional()
  @IsNumber()
  homeworld_id: number;

  @IsOptional()
  @IsArray()
  images: string[];
}
