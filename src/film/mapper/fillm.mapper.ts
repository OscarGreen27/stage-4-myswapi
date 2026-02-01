import { CreateFilmDto } from '../dto/film-create.dto';
import { FilmPeyload as FilmPayload } from '../peyload/film-create.peyload';

export class FilmMapper {
  static createFilmPeylod(dto: CreateFilmDto): FilmPayload {
    return {
      title: dto.title,
      episode_id: dto.episode_id,
      opening_crawl: dto.opening_crawl,
      director: dto.director,
      producer: dto.producer,
      release_date: dto.release_date,
      images: [],
    };
  }
}
