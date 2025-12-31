import { Body, Controller, Post, Get, Put, Delete, ParseIntPipe, Param, Query, UseGuards } from '@nestjs/common';
import { FilmService } from './film.service';
import { UpdateFilmDto } from './dto/update-film.dto';
import { CreateFilmDto } from './dto/create-film.dto';
import { ApiTags, ApiQuery, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Films } from './film.entity';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { RoleGuard } from 'src/auth/guards/role.guards';
import { FilmMapper } from './mapper/fillm.mapper';

@ApiBearerAuth()
@ApiTags('Films')
@Controller('films')
@UseGuards(AuthGuard, RoleGuard)
export class FilmController {
  constructor(private readonly filmServise: FilmService) {}

  @Get()
  @Roles(Role.Admin, Role.User)
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOperation({
    summary: 'Get a list of films',
    description: 'Returns all movies or a paginated list',
  })
  async get(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<Films[]> {
    if (!page && !limit) {
      return this.filmServise.getAll();
    }
    return this.filmServise.getSeveral(page || 1, limit || 2);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User)
  @ApiOperation({
    summary: 'Get a film by ID',
    description: 'Returns a single film entity by its ID, or null if not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.filmServise.getOne(id);
  }

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Create a new film',
    description: 'Adds a new film to the database. Only accessible by Admin users',
  })
  async create(@Body() film: CreateFilmDto) {
    const payload = FilmMapper.createFilmPeylod(film);
    return await this.filmServise.create(payload, film.relations);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Update a film',
    description: 'Updates an existing film by its ID with the provided data. Admin only. All fields are optional.',
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() film: UpdateFilmDto) {
    return this.filmServise.update(id, film);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Delete a film',
    description: 'Deletes a film by its ID. Returns true if deletion was successful. Admin only',
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.filmServise.delete(id);
  }
}
