import { Body, Controller, Post, Delete, UseGuards } from '@nestjs/common';
import { FilmPlanetService } from './film_planet.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
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
  @ApiBody({ type: FilmPlanetDto })
  async create(@Body('data') data: FilmPlanetDto) {
    return await this.filmPlanetService.create(data);
  }

  @Delete()
  @Roles(Role.Admin)
  @ApiBody({ type: FilmPlanetDto })
  async delete(@Body('data') data: FilmPlanetDto) {
    return await this.filmPlanetService.delete(data);
  }
}
