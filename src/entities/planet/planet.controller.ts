import { Body, Controller, Post, Get, Put, Delete, ParseIntPipe, Param, ValidationPipe, Query, UseGuards } from '@nestjs/common';
import { PlanetService } from './planet.service';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { CreatePlanetDto } from './dto/create-planet.dto';

import { ApiTags, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { Planets } from './planet.entity';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { RoleGuard } from 'src/auth/guards/role.guards';

@ApiBearerAuth()
@ApiTags('Planets')
@Controller('planets')
@UseGuards(AuthGuard, RoleGuard)
export class PlanetController {
  constructor(private readonly planetServise: PlanetService) {}

  /**
   *function request handler get to endpoint planet.
   *if pagination parameters are not specified, default parameters will be used
   * @param page page number
   * @param limit number of objects on one page
   * @returns array of entities planet
   */
  @Get()
  @Roles(Role.Admin, Role.User)
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async get(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<Planets[]> {
    if (!page && !limit) {
      return this.planetServise.getAll();
    }

    return this.planetServise.getSeveral(page || 1, limit || 10);
  }

  /**
   * function processes the request with the id parameter
   * @param id planet id
   * @returns entity planet if there is a match by id, null if there is no corresponding id in the database
   */
  @Get(':id')
  @Roles(Role.Admin, Role.User)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.planetServise.getOne(id);
  }

  //alowed from admin only

  /**
   *The function processes a request to create a new planet in the database.
   * @param film object with fields that correspond to CreatePlanetDto
   * @returns void
   */
  @Post()
  @Roles(Role.Admin)
  async create(@Body() planet: CreatePlanetDto) {
    return await this.planetServise.create(planet);
  }

  /**
   *put query handler function for editing entities planet
   * @param id planet ID to which changes need to be made
   * @param film object with new values for a specific planet
   * @returnsa planet with new meanings
   */
  @Put(':id')
  @Roles(Role.Admin)
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) planet: UpdatePlanetDto) {
    return await this.planetServise.update(id, planet);
  }

  /**
   * planet delete request handler function
   * @param id planet id
   * @returns true if film deleted success, false if not
   */
  @Delete(':id')
  @Roles(Role.Admin)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.planetServise.delete(id);
  }
}
