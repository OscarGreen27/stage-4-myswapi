import { ApiProperty } from '@nestjs/swagger';
import { NameCreateDto } from './create-name.dto';
import { IsString, MaxLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export abstract class TransportCreateDto extends NameCreateDto {
  @ApiProperty({ description: 'Model of the starship', example: 'YT-1300 light freighter' })
  @IsString()
  @MaxLength(50)
  model: string;

  @ApiProperty({ description: 'Manufacturer of the starship', example: 'Corellian Engineering Corporation' })
  @IsString()
  @MaxLength(100)
  manufacturer: string;

  @ApiProperty({ description: 'Cost in credits', example: '100000' })
  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsString()
  @MaxLength(15)
  cost_in_credits: string;

  @ApiProperty({ description: 'Length of the starship in meters', example: '34.37' })
  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsString()
  length: string;

  @ApiProperty({ description: 'Maximum atmosphering speed', example: '1050' })
  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsString()
  max_atmosphering_speed: string;

  @ApiProperty({ description: 'Number of crew members', example: '4' })
  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsString()
  crew: string;

  @ApiProperty({ description: 'Number of passengers', example: '6' })
  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsString()
  passengers: string;

  @ApiProperty({ description: 'Cargo capacity', example: '100000' })
  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsString()
  cargo_capacity: string;

  @ApiProperty({ description: 'Consumables duration', example: '2 months' })
  @IsString()
  @MaxLength(24)
  consumables: string;
}
