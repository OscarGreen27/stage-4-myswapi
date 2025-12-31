import { IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { EntityRelations } from 'src/entities/entity-relation.dto';

export class CreatePeopleDto {
  @ApiProperty({ description: 'Name of the character', example: 'Luke Skywalker' })
  @IsString()
  @MaxLength(24)
  name: string;

  @ApiProperty({ description: 'Height in cm', example: '172' })
  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsString()
  height: string;

  @ApiProperty({ description: 'Mass in kg', example: '77' })
  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsString()
  mass: string;

  @ApiProperty({ description: 'Hair color', example: 'Blond' })
  @IsString()
  @MaxLength(24)
  hair_color: string;

  @ApiProperty({ description: 'Skin color', example: 'Fair' })
  @IsString()
  @MaxLength(24)
  skin_color: string;

  @ApiProperty({ description: 'Eye color', example: 'Blue' })
  @IsString()
  @MaxLength(24)
  eye_color: string;

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

  @ApiProperty({ type: EntityRelations })
  @IsOptional()
  @ValidateNested()
  @Type(() => EntityRelations)
  relations: EntityRelations;
}
