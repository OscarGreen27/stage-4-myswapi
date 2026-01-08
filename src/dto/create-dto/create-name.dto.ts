import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export abstract class NameCreateDto {
  @ApiProperty({ description: 'Name of the character', example: 'Luke Skywalker' })
  @IsString()
  @MaxLength(24)
  name: string;
}
