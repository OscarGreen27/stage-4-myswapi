import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './film.entity';
import { Repository } from 'typeorm';
import { UpdateFilmDto } from './dto/film-update.dto';
import { FilmPeyload } from './peyload/film-create.peyload';

/**
 *class for working with films entity
 */
@Injectable()
export class FilmService {
  constructor(@InjectRepository(Film) private filmRepository: Repository<Film>) {}

  /**
   * the function gets all records in database from films table
   * @returns array of entities films sorted by id growing
   */
  async getAll(): Promise<Film[]> {
    const result = await this.filmRepository.find({
      order: { id: 'ASC' },
      relations: ['planets', 'species', 'starships', 'vehicles', 'characters'],
      select: {
        planets: { id: true, name: true },
        species: { id: true, name: true },
        starships: { id: true, name: true },
        vehicles: { id: true, name: true },
        characters: { id: true, name: true },
      },
    });

    return result;
  }

  /**
   * function gets one records in database from films table, if id mathc
   * @param id film id
   * @returns film entity if id exist in database, null if no id-match
   */
  async getOne(id: number): Promise<Film | null> {
    const result = await this.filmRepository.findOne({
      where: { id },
      relations: ['planets', 'species', 'starships', 'vehicles', 'characters'],
      select: {
        planets: { id: true, name: true },
        species: { id: true, name: true },
        starships: { id: true, name: true },
        vehicles: { id: true, name: true },
        characters: { id: true, name: true },
      },
    });
    return result;
  }

  /**
   * function return several records in database from films table,
   * if pagination parameters are not specified, default parameters are used
   * @param page page numebr
   * @param limit number of objects on page
   * @returns array of films entity
   */
  async getSeveral(page: number, limit: number): Promise<Film[]> {
    const skip = (page - 1) * limit;
    return await this.filmRepository.find({
      skip: skip,
      take: limit,
      order: { id: 'ASC' },
      relations: ['planets', 'species', 'starships', 'vehicles', 'characters'],
      select: {
        planets: { id: true, name: true },
        species: { id: true, name: true },
        starships: { id: true, name: true },
        vehicles: { id: true, name: true },
        characters: { id: true, name: true },
      },
    });
  }

  /**
   *function creates a new instance of the Films class.
   * First, the received input parameters are unpacked, an images array is added to them,
   * and a new instance of the Films class is created.
   * Then the instance is written to the database.
   * @param film object with new film data
   */
  async create(payload: FilmPeyload) {
    console.log(payload);
    const newFilm = this.filmRepository.create(payload);
    console.log(newFilm);

    return await this.filmRepository.save(newFilm);
  }

  /**
   * functio changes data in a record in the films table.
   * data replacement is performed by unpacking the record found in the database and the input parameter
   * @param id film id
   * @param updateDto object with fields to be replaced
   * @returns object with replaced fields, null if no record with the matching id was found
   */
  async update(id: number, updateDto: UpdateFilmDto): Promise<Film | null> {
    const existing = await this.filmRepository.findOneBy({ id });
    if (!existing) return null;

    const update = {
      ...existing,
      ...updateDto,
    };

    return await this.filmRepository.save(update);
  }

  /**
   * function deletes a record in the films table
   * @param id ID of the film to be deleted
   * @returns true if the deletion is successful, false if not
   */
  async delete(id: number): Promise<boolean> {
    const result = await this.filmRepository.delete(id);
    return result.affected !== 0;
  }
}
