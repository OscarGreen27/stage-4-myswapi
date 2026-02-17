import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Specie } from './specie.entity';
import { Repository } from 'typeorm';
import { UpdateSpecieDto } from './dto/specie-update.dto';
import { SpeciePeyload } from './payload/specie-create.peyload';

/**
 *class for working with specie entity
 */
@Injectable()
export class SpecieService {
  constructor(@InjectRepository(Specie) private specieRepository: Repository<Specie>) {}

  /**
   * the function gets all records in database from specie table
   * @returns array of entities specie sorted by id growing
   */
  async getAll(): Promise<Specie[]> {
    return await this.specieRepository.find({
      order: { id: 'ASC' },
      relations: ['homeworld', 'people', 'films'],
      select: { homeworld: { id: true, name: true }, people: { id: true, name: true }, films: { id: true, title: true } },
    });
  }

  /**
   * function gets one records in database from specie table, if id mathc
   * @param id specie id
   * @returns speci entity if id exist in database, null if no id-match
   */
  async getOne(id: number): Promise<Specie | null> {
    return await this.specieRepository.findOne({
      where: { id },
      relations: ['homeworld', 'people', 'films'],
      select: { homeworld: { id: true, name: true }, people: { id: true, name: true }, films: { id: true, title: true } },
    });
  }

  /**
   * function return several records in database from specie table,
   * if pagination parameters are not specified, default parameters are used
   * @param page page numebr
   * @param limit number of objects on page
   * @returns array of specie entity
   */
  async getSeveral(page: number, limit: number): Promise<Specie[]> {
    const skip = (page - 1) * limit;
    return await this.specieRepository.find({
      skip: skip,
      take: limit,
      order: { id: 'ASC' },
      relations: ['homeworld', 'films'],
      select: { homeworld: { id: true, name: true }, people: { id: true, name: true }, films: { id: true, title: true } },
    });
  }

  /**
   *function creates a new instance of the Specie class.
   * First, the received input parameters are unpacked, an images array is added to them,
   * and a new instance of the Specie class is created.
   * Then the instance is written to the database.
   * @param specie  object with new specie data
   */
  async create(peyload: SpeciePeyload): Promise<Specie> {
    const newSpecie = this.specieRepository.create(peyload);

    return await this.specieRepository.save(newSpecie);
  }

  /**
   * functio changes data in a record in the specie table.
   * data replacement is performed by unpacking the record found in the database and the input parameter
   * @param id specie id
   * @param updateDto object with fields to be replaced
   * @returns object with replaced fields, null if no record with the matching id was found
   */
  async update(id: number, updateDto: UpdateSpecieDto): Promise<Specie | null> {
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
}
