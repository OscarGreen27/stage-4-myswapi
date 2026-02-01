import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'people', name: 'people_specie' })
export class PeopleSpecieEntity {
  @PrimaryColumn()
  person_id: number;

  @PrimaryColumn()
  specie_id: number;
}
