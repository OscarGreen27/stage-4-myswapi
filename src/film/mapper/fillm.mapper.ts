import { CreateFilmDto } from '../dto/create-film.dto';
import { FilmPeyload as FilmPayload } from '../peyload/crete-film.peyload';

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
