import { Body, Controller, Post, Get, Put, Delete, ParseIntPipe, Param, ValidationPipe, Query, UseGuards } from '@nestjs/common';
import { StarshipService } from './starship.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';

import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Starships } from './starship.entity';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { RoleGuard } from 'src/auth/guards/role.guards';

@ApiBearerAuth()
@ApiTags('Starships')
@Controller('starships')
@UseGuards(AuthGuard, RoleGuard)
export class StarshipController {
  constructor(private readonly starshipServise: StarshipService) {}

  /**
   *function request handler get to endpoint starship.
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
  ): Promise<Starships[]> {
    if (!page && !limit) {
      return this.starshipServise.getAll();
    }
    return this.starshipServise.getSeveral(page || 1, limit || 10);
  }

  /**
   * function processes the request with the id parameter
   * @param id starship id
   * @returns entity staship if there is a match by id, null if there is no corresponding id in the database
   */
  @Get(':id')
  @Roles(Role.Admin, Role.User)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.starshipServise.getOne(id);
  }

  /**
   *The function processes a request to create a new starship in the database.
   * @param starship object with fields that correspond to CreateStarshipDto
   * @returns void
   */
  @Post()
  @Roles(Role.Admin)
  async create(@Body() starship: CreateStarshipDto) {
    return await this.starshipServise.create(starship);
  }

  /**
   *put query handler function for editing entities starship
   * @param id starship ID to which changes need to be made
   * @param starship object with new values for a specific film
   * @returnsa starship with new meanings
   */
  @Put(':id')
  @Roles(Role.Admin)
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) film: UpdateStarshipDto) {
    return this.starshipServise.update(id, film);
  }

  /**
   * starship delete request handler function
   * @param id starship id
   * @returns true if film deleted success, false if not
   */
  @Delete(':id')
  @Roles(Role.Admin)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.starshipServise.delete(id);
  }
}
