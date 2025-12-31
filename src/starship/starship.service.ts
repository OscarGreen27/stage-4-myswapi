import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Starships } from './starship.entity';
import { Repository } from 'typeorm';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { StarshipPeyload } from './peyload/create-starship.peyload';
import { EntityRelations } from 'src/entities/entity-relation.dto';

/**
 *class for working with starship entity
 */
@Injectable()
export class StarshipService {
  constructor(
    @InjectRepository(Starships)
    private starshipRepository: Repository<Starships>,
  ) {}

  /**
   * the function gets all records in database from starship table
   * @returns array of entities films sorted by id growing
   */
  async getAll(): Promise<Starships[]> {
    return await this.starshipRepository.find({ order: { id: 'ASC' }, relations: ['films', 'pilotes'] });
  }

  /**
   * function gets one records in database from starship table, if id mathc
   * @param id starship id
   * @returns starship entity if id exist in database, null if no id-match
   */
  async getOne(id: number): Promise<Starships | null> {
    return await this.starshipRepository.findOne({ where: { id }, relations: ['films', 'pilotes'] });
  }

  /**
   * function return several records in database from starship table,
   * if pagination parameters are not specified, default parameters are used
   * @param page page numebr
   * @param limit number of objects on page
   * @returns array of starships entity
   */
  async getSeveral(page: number, limit: number): Promise<Starships[]> {
    const skip = (page - 1) * limit;
    return await this.starshipRepository.find({
      skip: skip,
      take: limit,
      order: { id: 'ASC' },
      relations: ['films', 'pilotes'],
    });
  }

  /**
   *function creates a new instance of the Starship class.
   * First, the received input parameters are unpacked, an images array is added to them,
   * and a new instance of the Starship class is created.
   * Then the instance is written to the database.
   * @param starship object with new film data
   */
  async create(peyload: StarshipPeyload, relations?: EntityRelations): Promise<Starships> {
    const newStarship = this.starshipRepository.create();
    if (relations) {
      //todo
    }

    return await this.starshipRepository.save(newStarship);
  }

  /**
   * functio changes data in a record in the starship table.
   * data replacement is performed by unpacking the record found in the database and the input parameter
   * @param id starship id
   * @param updateDto object with fields to be replaced
   * @returns object with replaced fields, null if no record with the matching id was found
   */
  async update(id: number, updateDto: UpdateStarshipDto): Promise<Starships | null> {
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

  /**
   * function adds image references to the starships images array
   * @param id starship id
   * @param url link to the picture
   * @returns true if the link is added to the array, false if not
   */
  async saveImage(id: number, url: string) {
    const starship = await this.starshipRepository.findOneBy({ id });
    if (!starship) {
      throw new Error(`Starship with id ${id} does not exist!`);
    }

    if (!starship.images) {
      starship.images = [];
    }
    starship.images.push(url);

    const result = await this.starshipRepository.update(id, starship);
    if (!result.affected) {
      throw new Error('Failed to add image link to database!');
    }
    return result.affected > 0;
  }

  async itExist(id: number): Promise<boolean> {
    return await this.starshipRepository.exists({ where: { id } });
  }

  async getImages(id: number) {
    const exist = await this.itExist(id);
    if (!exist) {
      throw new NotFoundException(`Starship with id: ${id} is not exist!`);
    }
    const starship = await this.starshipRepository.findOne({ where: { id }, select: ['images'] });
    return starship?.images || [];
  }
}
