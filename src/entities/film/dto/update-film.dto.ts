import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateFilmDto {
  @IsString()
  @IsOptional()
  @MaxLength(24)
  title: string;

  @IsNumber()
  @IsOptional()
  episode_id: number;

  @IsString()
  @IsOptional()
  @MaxLength(600)
  opening_crawl: string;

  @IsString()
  @IsOptional()
  @MaxLength(24)
  director: string;

  @IsString()
  @IsOptional()
  @MaxLength(24)
  producer: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  release_date: Date;
}
