import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PeopleStarshipService } from './people_starship.service';
import { PeopleStarshipDto } from './people_starship.dto';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { RoleGuard } from 'src/auth/guards/role.guards';

@ApiBearerAuth()
@ApiTags('People_Starship')
@Controller()
@UseGuards(AuthGuard, RoleGuard)
export class PeopleStarshipController {
  constructor(private readonly peopleStarshipService: PeopleStarshipService) {}

  @Post('people-starship')
  @Roles(Role.Admin)
  @ApiBody({ type: PeopleStarshipDto, description: 'Person ID and Starship ID to link' })
  @ApiOperation({
    summary: 'Assign a starship to a person',
    description: 'Creates a link between a person and a starship. Admin only.',
  })
  async create(@Body('data') data: PeopleStarshipDto) {
    return await this.peopleStarshipService.create(data);
  }

  @Delete('people-starship')
  @Roles(Role.Admin)
  @ApiBody({ type: PeopleStarshipDto, description: 'Person ID and Starship ID to unlink' })
  @ApiOperation({
    summary: 'Remove a starship from a person',
    description: 'Deletes the link between a person and a starship. Admin only.',
  })
  async delete(@Body('data') data: PeopleStarshipDto) {
    return await this.peopleStarshipService.delete(data);
  }
}
