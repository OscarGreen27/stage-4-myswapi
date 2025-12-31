import { Body, Controller, Post, Delete, UseGuards } from '@nestjs/common';
import { FilmPlanetService } from './film_planet.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilmPlanetDto } from './film_planet.dto';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { RoleGuard } from 'src/auth/guards/role.guards';

@ApiBearerAuth()
@ApiTags('Film_Planet')
@Controller('film-planet')
@UseGuards(AuthGuard, RoleGuard)
export class FilmPlanetController {
  constructor(private readonly filmPlanetService: FilmPlanetService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Assign a planet to a film',
    description: 'Creates a link between a film and a planet. Admin only.',
  })
  @ApiBody({ type: FilmPlanetDto, description: 'Film and Planet IDs to link' })
  async create(@Body('data') data: FilmPlanetDto) {
    return await this.filmPlanetService.create(data);
  }

  @Delete()
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Remove a planet from a film',
    description: 'Deletes the link between a film and a planet. Admin only.',
  })
  @ApiBody({ type: FilmPlanetDto, description: 'Film and Planet IDs to unlink' })
  async delete(@Body('data') data: FilmPlanetDto) {
    return await this.filmPlanetService.delete(data);
  }
}
