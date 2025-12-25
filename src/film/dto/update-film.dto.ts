import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateFilmDto {
  @ApiPropertyOptional({ description: 'Title of the film', maxLength: 24, example: 'The Empire Strikes Back' })
  @IsString()
  @IsOptional()
  @MaxLength(24)
  title: string;

  @ApiPropertyOptional({ description: 'Episode ID of the film', example: 5 })
  @IsNumber()
  @IsOptional()
  episode_id: number;

  @ApiPropertyOptional({ description: 'Opening crawl text', maxLength: 600, example: 'It is a dark time for the Rebellion...' })
  @IsString()
  @IsOptional()
  @MaxLength(600)
  opening_crawl: string;

  @ApiPropertyOptional({ description: 'Director of the film', maxLength: 24, example: 'Irvin Kershner' })
  @IsString()
  @IsOptional()
  @MaxLength(24)
  director: string;

  @ApiPropertyOptional({ description: 'Producer of the film', maxLength: 24, example: 'Gary Kurtz, Rick McCallum' })
  @IsString()
  @IsOptional()
  @MaxLength(24)
  producer: string;

  @ApiPropertyOptional({ description: 'Release date of the film', type: String, format: 'date', example: '1980-05-21' })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  release_date: Date;

  @IsOptional()
  @IsArray()
  images: string[];
}
