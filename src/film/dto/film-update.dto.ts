import { PartialType } from '@nestjs/swagger';
import { CreateFilmDto } from './film-create.dto';

export class UpdateFilmDto extends PartialType(CreateFilmDto) {}
