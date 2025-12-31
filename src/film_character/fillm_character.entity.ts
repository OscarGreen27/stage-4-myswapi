import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'films', name: 'films_characters' })
export class FilmCharacterEntity {
  @PrimaryColumn()
  film_id: number;

  @PrimaryColumn()
  character_id: number;
}
