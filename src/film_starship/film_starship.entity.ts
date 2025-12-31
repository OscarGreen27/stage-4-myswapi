import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'films', name: 'films_starships' })
export class FilmStarshipEntity {
  @PrimaryColumn()
  film_id: number;

  @PrimaryColumn()
  starship_id: number;
}
