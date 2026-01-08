import { IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { EntityRelations } from 'src/entities/entity-relation.dto';
import { TransportCreateDto } from 'src/dto/create-dto/transport-create.dto';

export class CreateStarshipDto extends TransportCreateDto {
  // @ApiProperty({ description: 'Name of the starship', example: 'Millennium Falcon' })
  // @IsString()
  // @MaxLength(24)
  // name: string;

  // @ApiProperty({ description: 'Model of the starship', example: 'YT-1300 light freighter' })
  // @IsString()
  // @MaxLength(50)
  // model: string;

  // @ApiProperty({ description: 'Manufacturer of the starship', example: 'Corellian Engineering Corporation' })
  // @IsString()
  // @MaxLength(100)
  // manufacturer: string;

  // @ApiProperty({ description: 'Cost in credits', example: '100000' })
  // @Transform(({ value }: TransformFnParams): string => {
  //   return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  // })
  // @IsString()
  // @MaxLength(15)
  // cost_in_credits: string;

  // @ApiProperty({ description: 'Length of the starship in meters', example: '34.37' })
  // @Transform(({ value }: TransformFnParams): string => {
  //   return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  // })
  // @IsString()
  // length: string;

  // @ApiProperty({ description: 'Maximum atmosphering speed', example: '1050' })
  // @Transform(({ value }: TransformFnParams): string => {
  //   return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  // })
  // @IsString()
  // max_atmosphering_speed: string;

  // @ApiProperty({ description: 'Number of crew members', example: '4' })
  // @Transform(({ value }: TransformFnParams): string => {
  //   return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  // })
  // @IsString()
  // crew: string;

  // @ApiProperty({ description: 'Number of passengers', example: '6' })
  // @Transform(({ value }: TransformFnParams): string => {
  //   return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  // })
  // @IsString()
  // passengers: string;

  // @ApiProperty({ description: 'Cargo capacity', example: '100000' })
  // @Transform(({ value }: TransformFnParams): string => {
  //   return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  // })
  // @IsString()
  // cargo_capacity: string;

  // @ApiProperty({ description: 'Consumables duration', example: '2 months' })
  // @IsString()
  // @MaxLength(24)
  // consumables: string;

  @ApiProperty({ description: 'Hyperdrive rating', example: '0.5' })
  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsString()
  hyperdrive_rating: string;

  @ApiProperty({ description: 'MGLT (Megalight per hour)', example: '75' })
  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsString()
  mglt: string;

  @ApiProperty({ description: 'Starship class', example: 'Light freighter' })
  @IsString()
  @MaxLength(50)
  starship_class: string;

  @ApiProperty({ type: EntityRelations })
  @IsOptional()
  @ValidateNested()
  @Type(() => EntityRelations)
  relations: EntityRelations;
}
