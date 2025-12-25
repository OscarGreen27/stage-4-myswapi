import { CreateFilmDto } from '../dto/create-film.dto';
import { CreateFilmPeyload } from '../peyload/crete-film.peyload';

export class FilmMapper {
  static createPeylod(dto: CreateFilmDto): CreateFilmPeyload {
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
