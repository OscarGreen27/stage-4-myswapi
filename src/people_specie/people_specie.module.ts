import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleSpecieEntity } from './people_specie.entity';
import { PeopleSpecieService } from './people_specie.service';
import { PeopleSpecieController } from './people_specie.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PeopleSpecieEntity])],
  providers: [PeopleSpecieService],
  exports: [PeopleSpecieService, TypeOrmModule],
  controllers: [PeopleSpecieController],
})
export class PeopleSpecieModule {}
