import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'film', name: 'films_vehicle' })
export class FilmVehicleEntity {
  @PrimaryColumn()
  film_id: number;

  @PrimaryColumn()
  vehicle_id: number;
}
