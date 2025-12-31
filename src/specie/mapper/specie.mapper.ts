import { CreateSpecieDto } from '../dto/create-specie.dto';
import { SpeciePeyload } from '../payload/create-specie.peyload';

export class SpecieMapper {
  static createSpecieMapper(dto: CreateSpecieDto): SpeciePeyload {
    return {
      name: dto.name,
      classificationclss: dto.classification,
      designation: dto.designation,
      average_height: dto.average_lifespan,
      skin_colors: dto.skin_colors,
      hair_colors: dto.hair_colors,
      eye_colors: dto.eye_colors,
      average_lifespan: dto.average_lifespan,
      language: dto.language,
      homeworld_id: dto.homeworld_id,
    };
  }
}
