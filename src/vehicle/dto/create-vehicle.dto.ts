import { IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { EntityRelations } from 'src/entities/entity-relation.dto';
import { TransportCreateDto } from 'src/dto/create-dto/transport-create.dto';

export class CreateVehicleDto extends TransportCreateDto {
  // @ApiProperty({ example: 'Millennium Falcon', description: 'Name of the vehicle' })
  // @IsString()
  // @MaxLength(24)
  // name: string;

  // @ApiProperty({ example: 'YT-1300 light freighter', description: 'Model of the vehicle' })
  // @IsString()
  // @MaxLength(24)
  // model: string;

  // @ApiProperty({ example: 'Corellian Engineering Corporation', description: 'Manufacturer of the vehicle' })
  // @IsString()
  // @MaxLength(50)
  // manufacturer: string;

  // @ApiProperty({ example: '100000', description: 'Cost in credits', type: String })
  // @Transform(({ value }: TransformFnParams): string => {
  //   return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  // })
  // @IsString()
  // @MaxLength(15)
  // cost_in_credits: string;

  // @ApiProperty({ example: '34.37', description: 'Length in meters', type: String })
  // @Transform(({ value }: TransformFnParams): string => {
  //   return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  // })
  // @IsString()
  // @MaxLength(24)
  // length: string;

  // @ApiProperty({ example: '1050', description: 'Maximum speed in atmosphere', type: String })
  // @Transform(({ value }: TransformFnParams): string => {
  //   return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  // })
  // @IsString()
  // @MaxLength(24)
  // max_atmosphering_speed: string;

  // @ApiProperty({ example: '4', description: 'Crew size', type: String })
  // @Transform(({ value }: TransformFnParams): string => {
  //   return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  // })
  // @IsString()
  // @MaxLength(24)
  // crew: string;

  // @ApiProperty({ example: '6', description: 'Number of passengers', type: String })
  // @Transform(({ value }: TransformFnParams): string => {
  //   return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  // })
  // @IsString()
  // @MaxLength(24)
  // passengers: string;

  // @ApiProperty({ example: '100000', description: 'Cargo capacity in kilograms', type: String })
  // @Transform(({ value }: TransformFnParams): string => {
  //   return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  // })
  // @IsString()
  // @MaxLength(24)
  // cargo_capacity: string;

  // @ApiProperty({ example: '2 months', description: 'Maximum duration of consumables', type: String })
  // @IsString()
  // @MaxLength(24)
  // consumables: string;

  @ApiProperty({ example: 'Light freighter', description: 'Class of the vehicle', type: String })
  @IsString()
  @MaxLength(24)
  vehicle_class: string;

  @ApiProperty({ type: EntityRelations })
  @IsOptional()
  @ValidateNested()
  @Type(() => EntityRelations)
  relations: EntityRelations;
}
