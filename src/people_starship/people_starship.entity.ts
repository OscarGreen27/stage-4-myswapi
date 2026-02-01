import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'people', name: 'people_starship' })
export class PeopleStarshipEntity {
  @PrimaryColumn()
  person_id: number;

  @PrimaryColumn()
  starship_id: number;
}
