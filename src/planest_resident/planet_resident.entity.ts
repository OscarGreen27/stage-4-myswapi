import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'planets', name: 'planet_resident' })
export class PlanetResidentEntity {
  @PrimaryColumn()
  planet_id: number;

  @PrimaryColumn()
  resident_id: number;
}
