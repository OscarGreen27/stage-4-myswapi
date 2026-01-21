import { IsDate, IsNumber, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFilmDto {
  @ApiProperty({ description: 'Title of the film', maxLength: 24, example: 'A New Hope' })
  @IsString()
  @MaxLength(24)
  title: string;

  @ApiProperty({ description: 'Episode ID of the film', example: 4 })
  @IsNumber()
  episode_id: number;

  @ApiProperty({ description: 'Opening crawl text', maxLength: 600, example: 'It is a period of civil war...' })
  @IsString()
  @MaxLength(600)
  opening_crawl: string;

  @ApiProperty({ description: 'Director of the film', maxLength: 24, example: 'George Lucas' })
  @IsString()
  @MaxLength(24)
  director: string;

  @ApiProperty({ description: 'Producer of the film', maxLength: 24, example: 'Gary Kurtz' })
  @IsString()
  @MaxLength(24)
  producer: string;

  @ApiProperty({ description: 'Release date', type: String, format: 'date', example: '1977-05-25' })
  @IsDate()
  @Type(() => Date)
  release_date: Date;
}
