import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Film } from '../film/film.entity';
import { People } from '../people/people.entity';

@Entity({ name: 'starship', schema: 'starship' })
export class Starship {
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
  hyperdrive_rating: string;

  @Column()
  mglt: string;

  @Column()
  starship_class: string;

  @Column('text', { array: true, nullable: true })
  images: string[];

  @ManyToMany(() => People, (people) => people.starships)
  pilotes: People[];

  @ManyToMany(() => Film, (film) => film.starships)
  films: Film[];
}
