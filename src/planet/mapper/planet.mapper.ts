import { CreatePlanetDto } from '../dto/planet-create.dto';
import { PlanetPayload } from '../payload/planer-create.payload';

export class PlanetMapper {
  static createPlanerPayload(dto: CreatePlanetDto): PlanetPayload {
    return {
      name: dto.name,
      rotation_period: dto.rotation_period,
      orbital_perid: dto.orbital_period,
      diameter: dto.diameter,
      climate: dto.climate,
      gravity: dto.gravity,
      terrain: dto.terrain,
      surface_water: dto.surface_water,
      population: dto.population,
    };
  }
}
