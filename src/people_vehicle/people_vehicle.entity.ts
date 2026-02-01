import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'people', name: 'people_vehicle' })
export class PeopleVehicleEntity {
  @PrimaryColumn()
  person_id: number;

  @PrimaryColumn()
  vehicle_id: number;
}
