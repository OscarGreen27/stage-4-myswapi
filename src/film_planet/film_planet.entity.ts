import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'film', name: 'films_planet' })
export class FilmPlanetEntity {
  @PrimaryColumn()
  film_id: number;

  @PrimaryColumn()
  planet_id: number;
}
