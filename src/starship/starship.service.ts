import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Starship } from './starship.entity';
import { Repository } from 'typeorm';
import { UpdateStarshipDto } from './dto/starship-update.dto';
import { StarshipPeyload } from './peyload/create-starship.peyload';

/**
 *class for working with starship entity
 */
@Injectable()
export class StarshipService {
  constructor(
    @InjectRepository(Starship)
    private starshipRepository: Repository<Starship>,
  ) {}

  /**
   * the function gets all records in database from starship table
   * @returns array of entities films sorted by id growing
   */
  async getAll(): Promise<Starship[]> {
    return await this.starshipRepository.find({
      order: { id: 'ASC' },
      relations: ['films', 'pilotes'],
      select: { films: { id: true, title: true }, pilotes: { id: true, name: true } },
    });
  }

  /**
   * function gets one records in database from starship table, if id mathc
   * @param id starship id
   * @returns starship entity if id exist in database, null if no id-match
   */
  async getOne(id: number): Promise<Starship | null> {
    return await this.starshipRepository.findOne({
      where: { id },
      relations: ['films', 'pilotes'],
      select: { films: { id: true, title: true }, pilotes: { id: true, name: true } },
    });
  }

  /**
   * function return several records in database from starship table,
   * if pagination parameters are not specified, default parameters are used
   * @param page page numebr
   * @param limit number of objects on page
   * @returns array of starships entity
   */
  async getSeveral(page: number, limit: number): Promise<Starship[]> {
    const skip = (page - 1) * limit;
    return await this.starshipRepository.find({
      skip: skip,
      take: limit,
      order: { id: 'ASC' },
      relations: ['films', 'pilotes'],
      select: { films: { id: true, title: true }, pilotes: { id: true, name: true } },
    });
  }

  /**
   *function creates a new instance of the Starship class.
   * First, the received input parameters are unpacked, an images array is added to them,
   * and a new instance of the Starship class is created.
   * Then the instance is written to the database.
   * @param starship object with new film data
   */
  async create(peyload: StarshipPeyload): Promise<Starship> {
    const newStarship = this.starshipRepository.create(peyload);

    return await this.starshipRepository.save(newStarship);
  }

  /**
   * functio changes data in a record in the starship table.
   * data replacement is performed by unpacking the record found in the database and the input parameter
   * @param id starship id
   * @param updateDto object with fields to be replaced
   * @returns object with replaced fields, null if no record with the matching id was found
   */
  async update(id: number, updateDto: UpdateStarshipDto): Promise<Starship | null> {
    const existing = await this.starshipRepository.findOneBy({ id });
    if (!existing) return null;

    const update = {
      ...existing,
      ...updateDto,
    };

    return await this.starshipRepository.save(update);
  }

  /**
   * function deletes a record in the starships table
   * @param id ID of the starship to be deleted
   * @returns true if the deletion is successful, false if not
   */
  async delete(id: number): Promise<boolean> {
    const result = await this.starshipRepository.delete(id);
    return result.affected !== 0;
  }
}
