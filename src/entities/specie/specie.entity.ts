import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinColumn, OneToOne } from 'typeorm';
import { Films } from '../../film/film.entity';
import { People } from '../people/people.entity';
import { Planets } from '../planet/planet.entity';

@Entity({ name: 'species', schema: 'species' })
export class Species {
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

  @Column('text', { array: true, nullable: true })
  images: string[];

  @OneToOne(() => Planets)
  @JoinColumn({ name: 'homeworld_id' })
  homeworld: Planets;

  @ManyToMany(() => People, (people) => people.species)
  people: People[];

  @ManyToMany(() => Films, (films) => films.species)
  films: Films[];
}
