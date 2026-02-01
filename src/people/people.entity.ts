import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Planet } from '../planet/planet.entity';
import { Film } from '../film/film.entity';
import { Specie } from '../specie/specie.entity';
import { Vehicle } from '../vehicle/vehicle.entity';
import { Starship } from '../starship/starship.entity';

@Entity({ schema: 'people', name: 'people' })
export class People {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  height: string;

  @Column({ nullable: true })
  mass: string;

  @Column({ nullable: true })
  hair_color: string;

  @Column({ nullable: true })
  skin_color: string;

  @Column({ nullable: true })
  eye_color: string;

  @Column({ nullable: true })
  birth_year: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  homeworld_id: number;

  @Column('text', { array: true, nullable: true })
  images: string[];

  @OneToOne(() => Planet)
  @JoinColumn({ name: 'homeworld_id' })
  homeworld: Planet;

  @ManyToMany(() => Film, (film) => film.characters)
  films: Film[];

  @ManyToMany(() => Specie, (specie) => specie.people)
  @JoinTable({
    name: 'people_species',
    joinColumn: {
      name: 'specie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'person_id',
      referencedColumnName: 'id',
    },
  })
  species: Specie[];

  @ManyToMany(() => Vehicle, (vehicle) => vehicle.pilotes)
  @JoinTable({
    name: 'people_vehicles',
    joinColumn: {
      name: 'vehicle_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'person_id',
      referencedColumnName: 'id',
    },
  })
  vehicles: Vehicle[];

  @ManyToMany(() => Starship, (starship) => starship.pilotes)
  @JoinTable({
    name: 'people_starships',
    joinColumn: {
      name: 'starship_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'person_id',
      referencedColumnName: 'id',
    },
  })
  starships: Starship[];
}
