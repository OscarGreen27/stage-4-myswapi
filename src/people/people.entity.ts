import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Planets } from '../planet/planet.entity';
import { Films } from '../film/film.entity';
import { Species } from '../specie/specie.entity';
import { Vehicles } from '../vehicle/vehicle.entity';
import { Starships } from '../starship/starship.entity';

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

  @OneToOne(() => Planets)
  @JoinColumn({ name: 'homeworld_id' })
  homeworld: Planets;

  @ManyToMany(() => Films, (films) => films.characters)
  films: Films[];

  @ManyToMany(() => Species, (species) => species.people)
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
  species: Species[];

  @ManyToMany(() => Vehicles, (vehicles) => vehicles.pilotes)
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
  vehicles: Vehicles[];

  @ManyToMany(() => Starships, (starships) => starships.pilotes)
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
  starships: Starships[];
}
