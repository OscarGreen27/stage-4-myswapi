import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'people', name: 'people_vehicles' })
export class PeopleVehicleEntity {
  @PrimaryColumn()
  person_id: number;

  @PrimaryColumn()
  vehicle_id: number;
}
