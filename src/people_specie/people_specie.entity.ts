import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'people', name: 'people_species' })
export class PeopleSpecieEntity {
  @PrimaryColumn()
  person_id: number;

  @PrimaryColumn()
  specie_id: number;
}
