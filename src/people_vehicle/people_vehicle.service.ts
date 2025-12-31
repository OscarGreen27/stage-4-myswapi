import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeopleVehicleEntity } from './people_vehicle.entity';
import { PeopleVehicleDto } from './people_vehicle.dto';

@Injectable()
export class PeopleVehicleService {
  constructor(@InjectRepository(PeopleVehicleEntity) private peopleVehicleRepository: Repository<PeopleVehicleEntity>) {}

  async create(data: PeopleVehicleDto) {
    return await this.peopleVehicleRepository.save(data);
  }

  async delete(data: PeopleVehicleDto) {
    const result = await this.peopleVehicleRepository.delete(data);
    return result.affected !== 0;
  }
}
