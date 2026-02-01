import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Planet } from '../planet/planet.entity';
import { Specie } from '../specie/specie.entity';
import { Starship } from '../starship/starship.entity';
import { Vehicle } from '../vehicle/vehicle.entity';
import { People } from '../people/people.entity';

@Entity({ name: 'film', schema: 'film' })
export class Film {
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

  @ManyToMany(() => Planet, (planet) => planet.films)
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
  planets: Planet[];

  @ManyToMany(() => Specie, (specie) => specie.films)
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
  species: Specie[];

  @ManyToMany(() => Starship, (starship) => starship.films)
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
  starships: Starship[];

  @ManyToMany(() => Vehicle, (vehicle) => vehicle.films)
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
  vehicles: Vehicle[];
}
