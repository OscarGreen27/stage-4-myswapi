import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleStarshipService } from './people_starship.service';
import { PeopleStarshipEntity } from './people_starship.entity';
import { PeopleStarshipController } from './people_starship.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PeopleStarshipEntity])],
  providers: [PeopleStarshipService],
  exports: [PeopleStarshipService, TypeOrmModule],
  controllers: [PeopleStarshipController],
})
export class PeopleStarshipModule {}
