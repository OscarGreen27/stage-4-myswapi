import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './vehicle.entity';
import { Repository } from 'typeorm';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehiclePeyload } from './peyload/create-vehicle.peyload';

/**
 *class for working with vehicle entity
 */
@Injectable()
export class VehicleService {
  constructor(@InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>) {}

  /**
   * the function gets all records in database from vehicles table
   * @returns array of entities vehicles sorted by id growing
   */
  async getAll(): Promise<Vehicle[]> {
    return await this.vehicleRepository.find({
      order: { id: 'ASC' },
      relations: ['pilotes', 'films'],
      select: { pilotes: { id: true, name: true }, films: { id: true, title: true } },
    });
  }

  /**
   * function gets one records in database from vehicles table, if id mathc
   * @param id vehicle id
   * @returns vehicle entity if id exist in database, null if no id-match
   */
  async getOne(id: number): Promise<Vehicle | null> {
    return await this.vehicleRepository.findOne({
      where: { id },
      relations: ['pilotes', 'films'],
      select: { pilotes: { id: true, name: true }, films: { id: true, title: true } },
    });
  }

  /**
   * function return several records in database from vehicles table,
   * if pagination parameters are not specified, default parameters are used
   * @param page page numebr
   * @param limit number of objects on page
   * @returns array of vehicles entity
   */
  async getSeveral(page: number, limit: number): Promise<Vehicle[]> {
    const skip = (page - 1) * limit;
    return await this.vehicleRepository.find({
      skip: skip,
      take: limit,
      order: { id: 'ASC' },
      relations: ['pilotes', 'films'],
      select: { pilotes: { id: true, name: true }, films: { id: true, title: true } },
    });
  }

  /**
   *function creates a new instance of the Vehicles class.
   * First, the received input parameters are unpacked, an images array is added to them,
   * and a new instance of the Vehicles class is created.
   * Then the instance is written to the database.
   * @param vehicle object with new film data
   */
  async create(peyload: VehiclePeyload): Promise<Vehicle> {
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
  async update(id: number, updateDto: UpdateVehicleDto): Promise<Vehicle | null> {
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
}
