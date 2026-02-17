import { PartialType } from '@nestjs/swagger';
import { CreatePeopleDto } from './people-create.dto';

export class UpdatePeopleDto extends PartialType(CreatePeopleDto) {}
