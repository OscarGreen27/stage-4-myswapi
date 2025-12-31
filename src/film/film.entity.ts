import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Planets } from '../planet/planet.entity';
import { Species } from '../specie/specie.entity';
import { Starships } from '../starship/starship.entity';
import { Vehicles } from '../vehicle/vehicle.entity';
import { People } from '../people/people.entity';

@Entity({ name: 'films', schema: 'films' })
export class Films {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  episode_id: number;

  @Column()
  opening_crawl: string;

  @Column()
  director: string;

  @Column()
  producer: string;

  @Column()
  release_date: Date;

  @Column('text', { array: true, nullable: true })
  images: string[];

  @ManyToMany(() => People, (character) => character.films)
  @JoinTable({
    name: 'films_characters',
    joinColumn: {
      name: 'film_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'character_id',
      referencedColumnName: 'id',
    },
  })
  characters: People[];

  @ManyToMany(() => Planets, (planets) => planets.films)
  @JoinTable({
    name: 'films_planets',
    joinColumn: {
      name: 'film_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'planet_id',
      referencedColumnName: 'id',
    },
  })
  planets: Planets[];

  @ManyToMany(() => Species, (species) => species.films)
  @JoinTable({
    name: 'films_species',
    joinColumn: {
      name: 'film_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'specie_id',
      referencedColumnName: 'id',
    },
  })
  species: Species[];

  @ManyToMany(() => Starships, (starships) => starships.films)
  @JoinTable({
    name: 'films_starships',
    joinColumn: {
      name: 'film_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'starship_id',
      referencedColumnName: 'id',
    },
  })
  starships: Starships[];

  @ManyToMany(() => Vehicles, (vehicles) => vehicles.films)
  @JoinTable({
    name: 'films_vehicles',
    joinColumn: {
      name: 'film_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'vehicle_id',
      referencedColumnName: 'id',
    },
  })
  vehicles: Vehicles[];
}
