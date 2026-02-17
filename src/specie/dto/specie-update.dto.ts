import { PartialType } from '@nestjs/swagger';
import { CreateSpecieDto } from './specie-create.dto';
export class UpdateSpecieDto extends PartialType(CreateSpecieDto) {}
