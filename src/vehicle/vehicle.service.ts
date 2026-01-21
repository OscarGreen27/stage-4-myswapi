import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicles } from './vehicle.entity';
import { Repository } from 'typeorm';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehiclePeyload } from './peyload/create-vehicle.peyload';

/**
 *class for working with vehicle entity
 */
@Injectable()
export class VehicleService {
  constructor(@InjectRepository(Vehicles) private vehicleRepository: Repository<Vehicles>) {}

  /**
   * the function gets all records in database from vehicles table
   * @returns array of entities vehicles sorted by id growing
   */
  async getAll(): Promise<Vehicles[]> {
    return await this.vehicleRepository.find({ order: { id: 'ASC' }, relations: ['pilotes', 'films'] });
  }

  /**
   * function gets one records in database from vehicles table, if id mathc
   * @param id vehicle id
   * @returns vehicle entity if id exist in database, null if no id-match
   */
  async getOne(id: number): Promise<Vehicles | null> {
    return await this.vehicleRepository.findOne({ where: { id }, relations: ['pilotes', 'films'] });
  }

  /**
   * function return several records in database from vehicles table,
   * if pagination parameters are not specified, default parameters are used
   * @param page page numebr
   * @param limit number of objects on page
   * @returns array of vehicles entity
   */
  async getSeveral(page: number, limit: number): Promise<Vehicles[]> {
    const skip = (page - 1) * limit;
    return await this.vehicleRepository.find({
      skip: skip,
      take: limit,
      order: { id: 'ASC' },
      relations: ['pilotes', 'films'],
    });
  }

  /**
   *function creates a new instance of the Vehicles class.
   * First, the received input parameters are unpacked, an images array is added to them,
   * and a new instance of the Vehicles class is created.
   * Then the instance is written to the database.
   * @param vehicle object with new film data
   */
  async create(peyload: VehiclePeyload): Promise<Vehicles> {
    const newVehicle = this.vehicleRepository.create(peyload);

    return this.vehicleRepository.save(newVehicle);
  }

  /**
   * functio changes data in a record in the vehicles table.
   * data replacement is performed by unpacking the record found in the database and the input parameter
   * @param id vehicle id
   * @param updateDto object with fields to be replaced
   * @returns object with replaced fields, null if no record with the matching id was found
   */
  async update(id: number, updateDto: UpdateVehicleDto): Promise<Vehicles | null> {
    const existing = await this.vehicleRepository.findOneBy({ id });
    if (!existing) return null;

    const update = {
      ...existing,
      ...updateDto,
    };

    return await this.vehicleRepository.save(update);
  }

  /**
   * function deletes a record in the vehicles table
   * @param id ID of the vehicle to be deleted
   * @returns true if the deletion is successful, false if not
   */
  async delete(id: number): Promise<boolean> {
    const result = await this.vehicleRepository.delete(id);
    return result.affected !== 0;
  }

  /**
   * function adds image references to the vehicles images array
   * @param id vehicle id
   * @param url link to the picture
   * @returns true if the link is added to the array, false if not
   */
  async saveImage(id: number, url: string) {
    const vehicle = await this.vehicleRepository.findOneBy({ id });
    if (!vehicle) {
      throw new Error(`Vehicle with id ${id} does not exist!`);
    }

    if (!vehicle.images) {
      vehicle.images = [];
    }
    vehicle.images.push(url);

    const result = await this.vehicleRepository.update(id, vehicle);
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
    const vehicle = await this.vehicleRepository.findOne({ where: { id }, select: ['images'] });
    return vehicle?.images || [];
  }

  async itExist(id: number): Promise<boolean> {
    return await this.vehicleRepository.exists({ where: { id } });
  }
}
