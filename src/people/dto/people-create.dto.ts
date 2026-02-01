import { IsString, MaxLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AppearanceCreateDto } from 'src/dto/create-dto/appearance-create.dto';

export class CreatePeopleDto extends AppearanceCreateDto {
  @ApiProperty({ description: 'Height in cm', example: '172' })
  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsString()
  height: string;

  @ApiProperty({ description: 'Mass in kg', example: '77' })
  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsString()
  mass: string;

  @ApiProperty({ description: 'Birth year', example: '19BBY' })
  @IsString()
  @MaxLength(24)
  birth_year: string;

  @ApiProperty({ description: 'Gender', example: 'Male' })
  @IsString()
  @MaxLength(24)
  gender: string;

  @ApiProperty({ description: 'ID of homeworld', example: 1 })
  @IsString()
  @MaxLength(100)
  homeworld_id: number;
}
