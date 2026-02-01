import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Planet } from './planet.entity';
import { Repository } from 'typeorm';
import { UpdatePlanetDto } from './dto/planet-update.dto';
import { PlanetPayload } from './payload/planer-create.payload';

/**
 *class for working with planet entity
 */
@Injectable()
export class PlanetService {
  constructor(@InjectRepository(Planet) private planetRepository: Repository<Planet>) {}

  /**
   * the function gets all records in database from planets table
   * @returns array of entities planets sorted by id growing
   */
  async getAll(): Promise<Planet[]> {
    return await this.planetRepository.find({ order: { id: 'ASC' }, relations: ['residents', 'films'] });
  }

  /**
   * function gets one records in database from planets table, if id mathc
   * @param id planet id
   * @returns planet entity if id exist in database, null if no id-match
   */
  async getOne(id: number): Promise<Planet | null> {
    return await this.planetRepository.findOne({ where: { id }, relations: ['residents', 'films'] });
  }

  /**
   * function return several records in database from planets table,
   * if pagination parameters are not specified, default parameters are used
   * @param page page numebr
   * @param limit number of objects on page
   * @returns array of films entity
   */
  async getSeveral(page: number, limit: number): Promise<Planet[]> {
    const skip = (page - 1) * limit;
    return await this.planetRepository.find({
      skip: skip,
      take: limit,
      order: { id: 'ASC' },
      relations: ['residents', 'films'],
    });
  }

  /**
   *function creates a new instance of the Planets class.
   * First, the received input parameters are unpacked, an images array is added to them,
   * and a new instance of the Planet class is created.
   * Then the instance is written to the database.
   * @param planet object with new planet data
   */
  async create(peyload: PlanetPayload): Promise<Planet> {
    const newPlanet = this.planetRepository.create(peyload);

    return await this.planetRepository.save(newPlanet);
  }

  /**
   * functio changes data in a record in the planet table.
   * data replacement is performed by unpacking the record found in the database and the input parameter
   * @param id planet id
   * @param updateDto object with fields to be replaced
   * @returns object with replaced fields, null if no record with the matching id was found
   */
  async update(id: number, updateDto: UpdatePlanetDto): Promise<Planet | null> {
    const existing = await this.planetRepository.findOneBy({ id });
    if (!existing) return null;

    const update = {
      ...existing,
      ...updateDto,
    };

    return await this.planetRepository.save(update);
  }

  /**
   * function deletes a record in the planets table
   * @param id ID of the planet to be deleted
   * @returns true if the deletion is successful, false if not
   */
  async delete(id: number) {
    const result = await this.planetRepository.delete(id);
    return result.affected !== 0;
  }

  /**
   * function adds image references to the planets images array
   * @param id planet id
   * @param url link to the picture
   * @returns true if the link is added to the array, false if not
   */
  async saveImage(id: number, url: string) {
    const planet = await this.planetRepository.findOneBy({ id });
    if (!planet) {
      throw new Error(`Planet with id ${id} does not exist!`);
    }

    if (!planet.images) {
      planet.images = [];
    }
    planet.images.push(url);

    const result = await this.planetRepository.update(id, planet);
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
    const planet = await this.planetRepository.findOne({ where: { id }, select: ['images'] });
    return planet?.images || [];
  }

  async itExist(id: number): Promise<boolean> {
    return await this.planetRepository.exists({ where: { id } });
  }
}
