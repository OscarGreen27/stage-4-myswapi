import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'people', name: 'people_starships' })
export class PeopleStarshipEntity {
  @PrimaryColumn()
  person_id: number;

  @PrimaryColumn()
  starship_id: number;
}
