import { Injectable } from '@nestjs/common';
import { People } from 'src/people/people.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePeopleDto } from './dto/people-update.dto';
import { PeoplePayload } from './payload/people-create.peyload';

/**
 *class for working with people entity
 */
@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(People)
    private peopleRepository: Repository<People>,
  ) {}
  /**
   * the function gets all records in database from people table
   * @returns array of entities people sorted by id growing
   */
  async getAll(): Promise<People[]> {
    return await this.peopleRepository.find({
      order: { id: 'ASC' },
      relations: ['homeworld', 'films', 'species', 'vehicles', 'starships'],
      select: {
        homeworld: { id: true, name: true },
        films: { id: true, title: true },
        species: { id: true, name: true },
        vehicles: { id: true, name: true },
        starships: { id: true, name: true },
      },
    });
  }

  /**
   * finction gets one records in database from people table, if id mathc
   * @param id people id
   * @returns people entity if id exist in database, null if no id-match
   */
  async getOne(id: number): Promise<People | null> {
    return await this.peopleRepository.findOne({
      where: { id: id },
      relations: ['films', 'homeworld', 'species', 'vehicles', 'starships'],
      select: {
        homeworld: { id: true, name: true },
        films: { id: true, title: true },
        species: { id: true, name: true },
        vehicles: { id: true, name: true },
        starships: { id: true, name: true },
      },
    });
  }

  /**
   * function return several records in database from people table,
   * if pagination parameters are not specified, default parameters are used
   * @param page page numebr
   * @param limit number of objects on page
   * @returns array of people entity
   */
  async getSeveral(page: number, limit: number): Promise<People[]> {
    const skip = (page - 1) * limit;
    return await this.peopleRepository.find({
      skip: skip,
      take: limit,
      order: { id: 'ASC' },
      relations: ['homeworld', 'films', 'species', 'vehicles', 'starships'],
      select: {
        homeworld: { id: true, name: true },
        films: { id: true, title: true },
        species: { id: true, name: true },
        vehicles: { id: true, name: true },
        starships: { id: true, name: true },
      },
    });
  }

  /**
   * function creates a new instance of the People class.
   * First, the received input parameters are unpacked, an images array is added to them,
   * and a new instance of the People class is created.
   * Then the instance is written to the database.
   * @param film object with new people data
   */
  async create(payload: PeoplePayload): Promise<People> {
    const newPersone = this.peopleRepository.create(payload);

    return await this.peopleRepository.save(newPersone);
  }

  /**
   * functio changes data in a record in the people table.
   * data replacement is performed by unpacking the record found in the database and the input parameter
   * @param id persone id
   * @param updateDto object with fields to be replaced
   * @returns object with replaced fields, null if no record with the matching id was found
   */
  async update(id: number, updateDto: UpdatePeopleDto): Promise<People | null> {
    const existing = await this.peopleRepository.findOneBy({ id });
    if (!existing) return null;
    const updated = {
      ...existing,
      ...updateDto,
    };

    return await this.peopleRepository.save(updated);
  }

  /**
   * function deletes a record in the people table
   * @param id ID of the persone to be deleted
   * @returns true if the deletion is successful, false if not
   */
  async delete(id: number): Promise<boolean> {
    const result = await this.peopleRepository.delete(id);
    return result.affected !== 0;
  }
}
