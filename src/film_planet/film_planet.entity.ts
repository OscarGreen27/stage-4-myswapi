import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'films', name: 'films_planets' })
export class FilmPlanetEntity {
  @PrimaryColumn()
  film_id: number;

  @PrimaryColumn()
  planet_id: number;
}
