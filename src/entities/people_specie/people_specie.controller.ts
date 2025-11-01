import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { PeopleSpecieService } from './people_specie.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { PeopleSpecieDto } from './people_specie.dto';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { RoleGuard } from 'src/auth/guards/role.guards';

@ApiBearerAuth()
@ApiTags('People_Specie')
@Controller()
@UseGuards(AuthGuard, RoleGuard)
export class PeopleSpecieController {
  constructor(private readonly peopleSpecieService: PeopleSpecieService) {}

  @Post('people-specie')
  @Roles(Role.Admin)
  @ApiBody({ type: PeopleSpecieDto })
  async create(@Body('data') data: PeopleSpecieDto) {
    return await this.peopleSpecieService.create(data);
  }

  @Delete('people-specie')
  @Roles(Role.Admin)
  @ApiBody({ type: PeopleSpecieDto })
  async delete(@Body('data') data: PeopleSpecieDto) {
    return await this.peopleSpecieService.delete(data);
  }
}
