import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeopleStarshipEntity } from './people_starship.entity';
import { PeopleStarshipDto } from './people_starship.dto';

@Injectable()
export class PeopleStarshipService {
  constructor(@InjectRepository(PeopleStarshipEntity) private peopleStarshipRepository: Repository<PeopleStarshipEntity>) {}

  async create(data: PeopleStarshipDto) {
    return await this.peopleStarshipRepository.save(data);
  }

  async delete(data: PeopleStarshipDto) {
    const result = await this.peopleStarshipRepository.delete(data);
    return result.affected !== 0;
  }
}
