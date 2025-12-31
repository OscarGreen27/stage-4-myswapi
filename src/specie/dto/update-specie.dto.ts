import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsOptional, IsString, MaxLength, IsNumber, IsArray } from 'class-validator';

export class UpdateSpecieDto {
  @ApiPropertyOptional({ example: 'Wookiee', description: 'Name of the species' })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  name: string;

  @ApiPropertyOptional({ example: 'mammal', description: 'Classification of the species' })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  classification: string;

  @ApiPropertyOptional({ example: 'sentient', description: 'Designation of the species' })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  designation: string;

  @ApiPropertyOptional({ example: '210', description: 'Average height in cm or "unknown"' })
  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  average_height: string;

  @ApiPropertyOptional({ example: 'gray', description: 'Skin colors' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  skin_colors: string;

  @ApiPropertyOptional({ example: 'black, brown', description: 'Hair colors' })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  hair_colors: string;

  @ApiPropertyOptional({ example: 'blue, green, brown', description: 'Eye colors' })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  eye_colors: string;

  @ApiPropertyOptional({ example: '400', description: 'Average lifespan in years or "unknown"' })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  average_lifespan: string;

  @ApiPropertyOptional({ example: 'Shyriiwook', description: 'Language of the species' })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  language: string;

  @ApiPropertyOptional({ example: 14, description: 'Homeworld ID' })
  @IsOptional()
  @IsNumber()
  homeworld_id: number;

  @IsOptional()
  @IsArray()
  images: string[];
}
