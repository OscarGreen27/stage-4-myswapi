import { CreatePeopleDto } from '../dto/create-people.dto';
import { PeoplePayload } from '../payload/create-people.peyload';

export class PeopleMapper {
  static createPeyload(dto: CreatePeopleDto): PeoplePayload {
    return {
      name: dto.name,
      height: dto.height,
      mass: dto.mass,
      hair_color: dto.hair_color,
      skin_color: dto.skin_color,
      eye_color: dto.eye_color,
      birth_year: dto.birth_year,
      gender: dto.gender,
      homeworld_id: dto.homeworld_id,
    };
  }
}
