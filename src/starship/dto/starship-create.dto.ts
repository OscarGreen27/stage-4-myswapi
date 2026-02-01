import { IsString, MaxLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TransportCreateDto } from 'src/dto/create-dto/transport-create.dto';

export class CreateStarshipDto extends TransportCreateDto {
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
}
