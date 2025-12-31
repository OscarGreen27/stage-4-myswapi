import { CreateStarshipDto } from '../dto/create-starship.dto';
import { StarshipPeyload } from '../peyload/create-starship.peyload';

export class StarshipMapper {
  static createStarshipPeyload(dto: CreateStarshipDto): StarshipPeyload {
    return {
      name: dto.name,
      model: dto.model,
      manufacturer: dto.manufacturer,
      cost_in_credits: dto.cost_in_credits,
      length: dto.length,
      max_atmosphering_speed: dto.max_atmosphering_speed,
      crew: dto.crew,
      passengers: dto.passengers,
      cargo_capacity: dto.cargo_capacity,
      consumables: dto.consumables,
      hyperdrive_rating: dto.hyperdrive_rating,
      mglt: dto.mglt,
      starship_class: dto.starship_class,
    };
  }
}
