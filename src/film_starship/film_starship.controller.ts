import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { FilmStarshipService } from './film_starship.service';
import { FilmStarshipDto } from './film_starship.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { RoleGuard } from 'src/auth/guards/role.guards';

@ApiBearerAuth()
@ApiTags('Film_Starship')
@Controller('film-starship')
@UseGuards(AuthGuard, RoleGuard)
export class FilmStarshipController {
  constructor(private readonly filmStarshipService: FilmStarshipService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiBody({ type: FilmStarshipDto, description: 'Film and Starship IDs to link' })
  @ApiOperation({
    summary: 'Assign a starship to a film',
    description: 'Creates a link between a film and a starship. Admin only.',
  })
  async create(@Body('data') data: FilmStarshipDto) {
    return this.filmStarshipService.create(data);
  }

  @Delete()
  @Roles(Role.Admin)
  @ApiBody({ type: FilmStarshipDto, description: 'Film and Starship IDs to unlink' })
  @ApiOperation({
    summary: 'Remove a starship from a film',
    description: 'Deletes the link between a film and a starship. Admin only.',
  })
  async delete(@Body('data') data: FilmStarshipDto) {
    return this.filmStarshipService.delete(data);
  }
}
