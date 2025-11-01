import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanetResidentEntity } from './planet_resident.entity';
import { PlanetResidentDto } from './planet_resident.dto';

@Injectable()
export class PlanetResidentService {
  constructor(@InjectRepository(PlanetResidentEntity) private planetResidentRepository: Repository<PlanetResidentEntity>) {}

  async create(data: PlanetResidentDto) {
    return await this.planetResidentRepository.save(data);
  }

  async delete(data: PlanetResidentDto) {
    const result = await this.planetResidentRepository.delete(data);
    return result.affected !== 0;
  }
}
