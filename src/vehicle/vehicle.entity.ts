import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Film } from '../film/film.entity';
import { People } from '../people/people.entity';

@Entity({ name: 'vehicle', schema: 'vehicle' })
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  manufacturer: string;

  @Column()
  cost_in_credits: string;

  @Column()
  length: string;

  @Column()
  max_atmosphering_speed: string;

  @Column()
  crew: string;

  @Column()
  passengers: string;

  @Column()
  cargo_capacity: string;

  @Column()
  consumables: string;

  @Column()
  vehicle_class: string;

  @ManyToMany(() => People, (people) => people.vehicles)
  pilotes: People[];

  @ManyToMany(() => Film, (film) => film.vehicles)
  films: Film[];
}
