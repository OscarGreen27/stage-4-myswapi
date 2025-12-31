import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { PeopleSpecieService } from './people_specie.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @ApiBody({ type: PeopleSpecieDto, description: 'Person ID and Specie ID to link' })
  @ApiOperation({
    summary: 'Assign a specie to a person',
    description: 'Creates a link between a person and a specie. Admin only.',
  })
  async create(@Body('data') data: PeopleSpecieDto) {
    return await this.peopleSpecieService.create(data);
  }

  @Delete('people-specie')
  @Roles(Role.Admin)
  @ApiBody({ type: PeopleSpecieDto, description: 'Person ID and Specie ID to unlink' })
  @ApiOperation({
    summary: 'Remove a specie from a person',
    description: 'Deletes the link between a person and a specie. Admin only.',
  })
  async delete(@Body('data') data: PeopleSpecieDto) {
    return await this.peopleSpecieService.delete(data);
  }
}
