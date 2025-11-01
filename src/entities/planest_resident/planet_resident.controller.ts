import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { PlanetResidentService } from './planet_resident.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { PlanetResidentDto } from './planet_resident.dto';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { RoleGuard } from 'src/auth/guards/role.guards';

@ApiBearerAuth()
@ApiTags('Planet_Resident')
@Controller()
@UseGuards(AuthGuard, RoleGuard)
export class PlanetResidentController {
  constructor(private readonly planetResidentService: PlanetResidentService) {}

  @Post('planet-resident')
  @Roles(Role.Admin)
  @ApiBody({ type: PlanetResidentDto })
  async create(@Body('data') data: PlanetResidentDto) {
    return this.planetResidentService.create(data);
  }

  @Delete('planet-resident')
  @Roles(Role.Admin)
  @ApiBody({ type: PlanetResidentDto })
  async delete(@Body('data') data: PlanetResidentDto) {
    return await this.planetResidentService.delete(data);
  }
}
