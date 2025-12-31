import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'films', name: 'films_species' })
export class FilmSpecieEntity {
  @PrimaryColumn()
  film_id: number;

  @PrimaryColumn()
  specie_id: number;
}
