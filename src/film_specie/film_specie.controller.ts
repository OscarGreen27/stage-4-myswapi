import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilmSpecieService } from './film_specie.service';
import { Body, Controller, Post, Delete, UseGuards } from '@nestjs/common';
import { FilmSpecieDto } from './film_specie.dto';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { RoleGuard } from 'src/auth/guards/role.guards';

@ApiBearerAuth()
@ApiTags('Film_Specie')
@Controller('film-specie')
@UseGuards(AuthGuard, RoleGuard)
export class FilmSpecieController {
  constructor(private readonly filmSpecieService: FilmSpecieService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Assign a specie to a film',
    description: 'Creates a link between a film and a specie. Admin only.',
  })
  @ApiBody({ type: FilmSpecieDto, description: 'Film and Specie IDs to link' })
  async create(@Body('data') data: FilmSpecieDto) {
    await this.filmSpecieService.create(data);
  }

  @Delete()
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Remove a specie from a film',
    description: 'Deletes the link between a film and a specie. Admin only.',
  })
  @ApiBody({ type: FilmSpecieDto, description: 'Film and Specie IDs to unlink' })
  async delete(@Body('data') data: FilmSpecieDto) {
    await this.filmSpecieService.delete(data);
  }
}
