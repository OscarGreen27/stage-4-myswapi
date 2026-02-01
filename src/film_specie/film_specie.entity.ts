import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'film', name: 'films_specie' })
export class FilmSpecieEntity {
  @PrimaryColumn()
  film_id: number;

  @PrimaryColumn()
  specie_id: number;
}
