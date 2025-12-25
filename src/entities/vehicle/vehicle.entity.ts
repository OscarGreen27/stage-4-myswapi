import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Films } from '../../film/film.entity';
import { People } from '../people/people.entity';

@Entity({ name: 'vehicles', schema: 'vehicles' })
export class Vehicles {
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

  @Column('text', { array: true, nullable: true })
  images: string[];

  @ManyToMany(() => People, (people) => people.vehicles)
  pilotes: People[];

  @ManyToMany(() => Films, (films) => films.vehicles)
  films: Films[];
}
