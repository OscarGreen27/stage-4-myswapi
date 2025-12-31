import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeopleSpecieEntity } from './people_specie.entity';
import { PeopleSpecieDto } from './people_specie.dto';

@Injectable()
export class PeopleSpecieService {
  constructor(@InjectRepository(PeopleSpecieEntity) private peopleSpecieRepository: Repository<PeopleSpecieEntity>) {}

  async create(data: PeopleSpecieDto) {
    return await this.peopleSpecieRepository.save(data);
  }

  async delete(data: PeopleSpecieDto) {
    const result = await this.peopleSpecieRepository.delete(data);
    return result.affected !== 0;
  }
}
