import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { VehiclePeyload } from '../peyload/create-vehicle.peyload';

export class VehicleMapper {
  static createVehiclePeyload(dto: CreateVehicleDto): VehiclePeyload {
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
      vehicle_class: dto.vehicle_class,
    };
  }
}
