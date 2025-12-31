import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Species } from './specie.entity';
import { Repository } from 'typeorm';
import { UpdateSpecieDto } from './dto/update-specie.dto';
import { SpeciePeyload } from './payload/create-specie.peyload';
import { EntityRelations } from 'src/entities/entity-relation.dto';

/**
 *class for working with specie entity
 */
@Injectable()
export class SpecieService {
  constructor(@InjectRepository(Species) private specieRepository: Repository<Species>) {}

  /**
   * the function gets all records in database from specie table
   * @returns array of entities specie sorted by id growing
   */
  async getAll(): Promise<Species[]> {
    return await this.specieRepository.find({ order: { id: 'ASC' }, relations: ['homeworld', 'people', 'films'] });
  }

  /**
   * function gets one records in database from specie table, if id mathc
   * @param id specie id
   * @returns speci entity if id exist in database, null if no id-match
   */
  async getOne(id: number): Promise<Species | null> {
    return await this.specieRepository.findOne({ where: { id }, relations: ['homeworld', 'people', 'films'] });
  }

  /**
   * function return several records in database from specie table,
   * if pagination parameters are not specified, default parameters are used
   * @param page page numebr
   * @param limit number of objects on page
   * @returns array of specie entity
   */
  async getSeveral(page: number, limit: number): Promise<Species[]> {
    const skip = (page - 1) * limit;
    return await this.specieRepository.find({
      skip: skip,
      take: limit,
      order: { id: 'ASC' },
      relations: ['homeworld', 'people', 'films'],
    });
  }

  /**
   *function creates a new instance of the Specie class.
   * First, the received input parameters are unpacked, an images array is added to them,
   * and a new instance of the Specie class is created.
   * Then the instance is written to the database.
   * @param specie  object with new specie data
   */
  async create(peyload: SpeciePeyload, relation?: EntityRelations): Promise<Species> {
    const newSpecie = this.specieRepository.create(peyload);

    if (relation) {
      //todo
    }
    return await this.specieRepository.save(newSpecie);
  }

  /**
   * functio changes data in a record in the specie table.
   * data replacement is performed by unpacking the record found in the database and the input parameter
   * @param id specie id
   * @param updateDto object with fields to be replaced
   * @returns object with replaced fields, null if no record with the matching id was found
   */
  async update(id: number, updateDto: UpdateSpecieDto): Promise<Species | null> {
    const existing = await this.specieRepository.findOneBy({ id });
    if (!existing) return null;

    const update = {
      ...existing,
      ...updateDto,
    };

    return await this.specieRepository.save(update);
  }

  /**
   * function deletes a record in the specie table
   * @param id ID of the specie to be deleted
   * @returns true if the deletion is successful, false if not
   */
  async delete(id: number): Promise<boolean> {
    const result = await this.specieRepository.delete(id);
    return result.affected !== 0;
  }

  /**
   * function adds image references to the specie images array
   * @param id specie id
   * @param url link to the picture
   * @returns true if the link is added to the array, false if not
   */
  async saveImage(id: number, url: string) {
    const specie = await this.specieRepository.findOneBy({ id });
    if (!specie) {
      throw new Error(`Specie with id ${id} does not exist!`);
    }

    if (!specie.images) {
      specie.images = [];
    }
    specie.images.push(url);

    const result = await this.specieRepository.update(id, specie);
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
    const specie = await this.specieRepository.findOne({ where: { id }, select: ['images'] });
    return specie?.images || [];
  }

  async itExist(id: number): Promise<boolean> {
    return await this.specieRepository.exists({ where: { id } });
  }
}
