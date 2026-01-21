import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'films', name: 'films_vehicles' })
export class FilmVehicleEntity {
  @PrimaryColumn()
  film_id: number;

  @PrimaryColumn()
  vehicle_id: number;
}
