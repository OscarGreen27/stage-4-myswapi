import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Films } from './film.entity';
import { Repository } from 'typeorm';
import { UpdateFilmDto } from './dto/update-film.dto';
import { FilmPeyload } from './peyload/crete-film.peyload';
import { EntityRelations } from '../entities/entity-relation.dto';

/**
 *class for working with films entity
 */
@Injectable()
export class FilmService {
  constructor(@InjectRepository(Films) private filmRepository: Repository<Films>) {}

  /**
   * the function gets all records in database from films table
   * @returns array of entities films sorted by id growing
   */
  async getAll(): Promise<Films[]> {
    const result = await this.filmRepository.find({ order: { id: 'ASC' }, relations: ['planets', 'species', 'starships', 'vehicles', 'characters'] });

    return result;
  }

  /**
   * function gets one records in database from films table, if id mathc
   * @param id film id
   * @returns film entity if id exist in database, null if no id-match
   */
  async getOne(id: number): Promise<Films | null> {
    const result = await this.filmRepository.findOne({ where: { id }, relations: ['planets', 'species', 'starships', 'vehicles', 'characters'] });
    return result;
  }

  /**
   * function return several records in database from films table,
   * if pagination parameters are not specified, default parameters are used
   * @param page page numebr
   * @param limit number of objects on page
   * @returns array of films entity
   */
  async getSeveral(page: number, limit: number): Promise<Films[]> {
    const skip = (page - 1) * limit;
    return await this.filmRepository.find({
      skip: skip,
      take: limit,
      order: { id: 'ASC' },
      relations: ['planets', 'species', 'starships', 'vehicles', 'characters'],
    });
  }

  /**
   *function creates a new instance of the Films class.
   * First, the received input parameters are unpacked, an images array is added to them,
   * and a new instance of the Films class is created.
   * Then the instance is written to the database.
   * @param film object with new film data
   */
  async create(payload: FilmPeyload, relations?: EntityRelations) {
    console.log(payload);
    const newFilm = this.filmRepository.create(payload);
    console.log(newFilm);

    if (relations) {
      //...todo
      console.log(relations);
    }
    return await this.filmRepository.save(newFilm);
  }

  /**
   * functio changes data in a record in the films table.
   * data replacement is performed by unpacking the record found in the database and the input parameter
   * @param id film id
   * @param updateDto object with fields to be replaced
   * @returns object with replaced fields, null if no record with the matching id was found
   */
  async update(id: number, updateDto: UpdateFilmDto): Promise<Films | null> {
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

  /**
   * function adds image references to the films images array
   * @param id film id
   * @param url link to the picture
   * @returns true if the link is added to the array, false if not
   */
  async saveImage(id: number, url: string) {
    const film = await this.filmRepository.findOneBy({ id });
    if (!film) {
      throw new Error(`Film with id ${id} does not exist!`);
    }

    if (!film.images) {
      film.images = [];
    }
    film.images.push(url);

    const result = await this.filmRepository.update(id, film);
    if (!result.affected) {
      throw new Error('Failed to add image link to database!');
    }
    return result.affected > 0;
  }

  async getImages(id: number) {
    const exist = await this.itExist(id);
    if (!exist) {
      throw new NotFoundException(`Starship with id: ${id} is not exist!`);
    }
    const film = await this.filmRepository.findOne({ where: { id }, select: ['images'] });
    return film?.images || [];
  }

  async itExist(id: number): Promise<boolean> {
    return await this.filmRepository.exists({ where: { id } });
  }
}
