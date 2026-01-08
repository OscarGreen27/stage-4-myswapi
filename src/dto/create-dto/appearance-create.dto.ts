import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { NameCreateDto } from './create-name.dto';

export abstract class AppearanceCreateDto extends NameCreateDto {
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
}
