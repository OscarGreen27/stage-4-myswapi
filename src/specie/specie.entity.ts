import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinColumn, OneToOne } from 'typeorm';
import { Film } from '../film/film.entity';
import { People } from '../people/people.entity';
import { Planet } from '../planet/planet.entity';

@Entity({ name: 'specie', schema: 'specie' })
export class Specie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  classification: string;

  @Column()
  designation: string;

  @Column()
  average_height: string;

  @Column()
  hair_colors: string;

  @Column()
  skin_colors: string;

  @Column()
  eye_colors: string;

  @Column()
  average_lifespan: string;

  @Column()
  language: string;

  @Column()
  homeworld_id: number;

  @OneToOne(() => Planet)
  @JoinColumn({ name: 'homeworld_id' })
  homeworld: Planet;

  @ManyToMany(() => People, (people) => people.species)
  people: People[];

  @ManyToMany(() => Film, (film) => film.species)
  films: Film[];
}
