import { IsDate, IsNumber, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFilmDto {
  @IsString()
  @MaxLength(24)
  title: string;

  @IsNumber()
  episode_id: number;

  @IsString()
  @MaxLength(600)
  opening_crawl: string;

  @IsString()
  @MaxLength(24)
  director: string;

  @IsString()
  @MaxLength(24)
  producer: string;

  @IsDate()
  @Type(() => Date)
  release_date: Date;
}
