import { Body, Controller, Post, Get, Put, Delete, ParseIntPipe, Param, Query, UseGuards } from '@nestjs/common';
import { FilmService } from './film.service';
import { UpdateFilmDto } from './dto/update-film.dto';
import { CreateFilmDto } from './dto/create-film.dto';
import { ApiTags, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { Films } from './film.entity';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { RoleGuard } from 'src/auth/guards/role.guards';

@ApiBearerAuth()
@ApiTags('Films')
@Controller('films')
@UseGuards(AuthGuard, RoleGuard)
export class FilmController {
  constructor(private readonly filmServise: FilmService) {}

  /**
   *function request handler get to endpoint films.
   *if pagination parameters are not specified, default parameters will be used
   * @param page page number
   * @param limit number of objects on one page
   * @returns array of entities films
   */
  @Get()
  @Roles(Role.Admin, Role.User)
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async get(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<Films[]> {
    if (!page && !limit) {
      return this.filmServise.getAll();
    }
    return this.filmServise.getSeveral(page || 1, limit || 2);
  }

  /**
   * function processes the request with the id parameter
   * @param id films id
   * @returns entity film if there is a match by id, null if there is no corresponding id in the database
   */
  @Get(':id')
  @Roles(Role.Admin, Role.User)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.filmServise.getOne(id);
  }

  //alows from admin only

  /**
   *The function processes a request to create a new film in the database.
   * @param film object with fields that correspond to CreateFilmDto
   * @returns void
   */
  @Post()
  @Roles(Role.Admin)
  async create(@Body() film: CreateFilmDto) {
    return await this.filmServise.create(film);
  }

  /**
   *put query handler function for editing entities films
   * @param id film ID to which changes need to be made
   * @param film object with new values for a specific film
   * @returnsa film with new meanings
   */
  @Put(':id')
  @Roles(Role.Admin)
  async update(@Param('id', ParseIntPipe) id: number, @Body() film: UpdateFilmDto) {
    return this.filmServise.update(id, film);
  }

  /**
   * film delete request handler function
   * @param id film id
   * @returns true if film deleted success, false if not
   */
  @Delete(':id')
  @Roles(Role.Admin)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.filmServise.delete(id);
  }
}
