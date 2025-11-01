import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Films } from '../film/film.entity';
import { People } from '../people/people.entity';

@Entity({ name: 'planets', schema: 'planets' })
export class Planets {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  rotation_period: string;

  @Column()
  orbital_period: string;

  @Column()
  diameter: string;

  @Column()
  climate: string;

  @Column()
  gravity: string;

  @Column()
  terrain: string;

  @Column()
  surface_water: string;

  @Column()
  population: string;

  @Column('text', { array: true, nullable: true })
  images: string[];

  @ManyToMany(() => People)
  @JoinTable({
    name: 'planet_residents',
    joinColumn: {
      name: 'planet_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'resident_id',
      referencedColumnName: 'id',
    },
  })
  residents: People[];

  @ManyToMany(() => Films, (films) => films.planets)
  // @JoinTable({
  //   schema: 'films',
  //   name: 'films_planets',
  //   joinColumn: {
  //     name: 'planet_id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'film_id',
  //     referencedColumnName: 'id',
  //   },
  // })
  films: Films[];

  //зворотні зв'язки
  // @ManyToMany(() => Films, (films) => films.planets)
  // f: Films[];
}
