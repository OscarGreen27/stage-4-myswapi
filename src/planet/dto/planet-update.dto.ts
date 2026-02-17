import { PartialType } from '@nestjs/swagger';
import { CreatePlanetDto } from './planet-create.dto';
export class UpdatePlanetDto extends PartialType(CreatePlanetDto) {}
