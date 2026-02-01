import { CreateSpecieDto } from '../dto/specie-create.dto';
import { SpeciePeyload } from '../payload/specie-create.peyload';

export class SpecieMapper {
  static createSpecieMapper(dto: CreateSpecieDto): SpeciePeyload {
    return {
      name: dto.name,
      classificationclss: dto.classification,
      designation: dto.designation,
      average_height: dto.average_lifespan,
      skin_color: dto.skin_color,
      hair_color: dto.hair_color,
      eye_color: dto.eye_color,
      average_lifespan: dto.average_lifespan,
      language: dto.language,
      homeworld_id: dto.homeworld_id,
    };
  }
}
