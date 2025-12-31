import { Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { FilmVehicleService } from './film_vehicle.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilmVehicleDto } from './film_vehicle.dto';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { RoleGuard } from 'src/auth/guards/role.guards';

@ApiBearerAuth()
@ApiTags('Film_Vehicle')
@Controller('film-vehicle')
@UseGuards(AuthGuard, RoleGuard)
export class FilmVehicleController {
  constructor(private readonly filmVehicleService: FilmVehicleService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiBody({ type: FilmVehicleDto, description: 'Film and Vehicle IDs to link' })
  @ApiOperation({
    summary: 'Assign a vehicle to a film',
    description: 'Creates a link between a film and a vehicle. Admin only.',
  })
  async create(data: FilmVehicleDto) {
    return await this.filmVehicleService.create(data);
  }

  @Delete()
  @Roles(Role.Admin)
  @ApiBody({ type: FilmVehicleDto, description: 'Film and Vehicle IDs to unlink' })
  @ApiOperation({
    summary: 'Remove a vehicle from a film',
    description: 'Deletes the link between a film and a vehicle. Admin only.',
  })
  async delete(data: FilmVehicleDto) {
    return await this.filmVehicleService.delete(data);
  }
}
