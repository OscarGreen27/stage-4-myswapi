import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'film', name: 'films_character' })
export class FilmCharacterEntity {
  @PrimaryColumn()
  film_id: number;

  @PrimaryColumn()
  character_id: number;
}
