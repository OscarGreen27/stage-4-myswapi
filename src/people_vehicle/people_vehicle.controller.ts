import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { PeopleVehicleService } from './people_vehicle.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PeopleVehicleDto } from './people_vehicle.dto';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { RoleGuard } from 'src/auth/guards/role.guards';

@ApiBearerAuth()
@ApiTags('People_Vehicle')
@Controller()
@UseGuards(AuthGuard, RoleGuard)
export class PeopleVehicleController {
  constructor(private readonly peopleVehicleService: PeopleVehicleService) {}

  @Post('people-vehicle')
  @Roles(Role.Admin)
  @ApiBody({ type: PeopleVehicleDto, description: 'Person ID and Vehicle ID to link' })
  @ApiOperation({
    summary: 'Assign a vehicle to a person',
    description: 'Creates a link between a person and a vehicle. Admin only.',
  })
  async create(@Body('data') data: PeopleVehicleDto) {
    return await this.peopleVehicleService.create(data);
  }

  @Delete('people-vehicle')
  @Roles(Role.Admin)
  @ApiBody({ type: PeopleVehicleDto, description: 'Person ID and Vehicle ID to unlink' })
  @ApiOperation({
    summary: 'Remove a vehicle from a person',
    description: 'Deletes the link between a person and a vehicle. Admin only.',
  })
  async delete(@Body('data') data: PeopleVehicleDto) {
    return this.peopleVehicleService.delete(data);
  }
}
