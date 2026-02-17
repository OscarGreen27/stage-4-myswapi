import { PartialType } from '@nestjs/swagger';
import { CreateStarshipDto } from './starship-create.dto';

export class UpdateStarshipDto extends PartialType(CreateStarshipDto) {}
