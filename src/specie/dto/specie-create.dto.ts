import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsNumber, IsString, MaxLength } from 'class-validator';
import { AppearanceCreateDto } from 'src/dto/create-dto/appearance-create.dto';

export class CreateSpecieDto extends AppearanceCreateDto {
  @ApiProperty({ example: 'mammal', description: 'Classification of the species' })
  @IsString()
  @MaxLength(24)
  classification: string;

  @ApiProperty({ example: 'sentient', description: 'Designation of the species' })
  @IsString()
  @MaxLength(24)
  designation: string;

  @ApiProperty({ example: '210', description: 'Average height in cm or "unknown"' })
  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsString()
  @MaxLength(24)
  average_height: string;

  @ApiProperty({ example: '400', description: 'Average lifespan in years or "unknown"' })
  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsString()
  average_lifespan: string;

  @ApiProperty({ example: 'Shyriiwook', description: 'Language of the species' })
  @IsString()
  @MaxLength(24)
  language: string;

  @ApiProperty({ example: 14, description: 'Homeworld ID' })
  @IsNumber()
  homeworld_id: number;
}
