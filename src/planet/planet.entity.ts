import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Film } from '../film/film.entity';
import { People } from '../people/people.entity';

@Entity({ name: 'planet', schema: 'planet' })
export class Planet {
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

  @ManyToMany(() => Film, (film) => film.planets)
  films: Film[];
}
