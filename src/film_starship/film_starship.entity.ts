import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'film', name: 'films_starship' })
export class FilmStarshipEntity {
  @PrimaryColumn()
  film_id: number;

  @PrimaryColumn()
  starship_id: number;
}
