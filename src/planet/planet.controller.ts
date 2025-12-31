import { Body, Controller, Post, Get, Put, Delete, ParseIntPipe, Param, ValidationPipe, Query, UseGuards } from '@nestjs/common';
import { PlanetService } from './planet.service';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { CreatePlanetDto } from './dto/create-planet.dto';

import { ApiTags, ApiQuery, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Planets } from './planet.entity';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { RoleGuard } from 'src/auth/guards/role.guards';
import { PlanetMapper } from './mapper/planet.mapper';

@ApiBearerAuth()
@ApiTags('Planets')
@Controller('planets')
@UseGuards(AuthGuard, RoleGuard)
export class PlanetController {
  constructor(private readonly planetServise: PlanetService) {}

  @Get()
  @Roles(Role.Admin, Role.User)
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOperation({ summary: 'Get planets', description: 'Returns all planets or a paginated list' })
  async get(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<Planets[]> {
    if (!page && !limit) {
      return this.planetServise.getAll();
    }

    return this.planetServise.getSeveral(page || 1, limit || 10);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'Get planet by id', description: 'Returns a single planet by id' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.planetServise.getOne(id);
  }

  //alowed from admin only

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Create a new planet',
    description: 'Adds a new planet to the database. Only accessible by Admin users',
  })
  async create(@Body() planet: CreatePlanetDto) {
    const payload = PlanetMapper.createPlanerPayload(planet);
    return await this.planetServise.create(payload, planet.relations);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Update a planet',
    description: 'Updates an existing planet by its ID with the provided data. Admin only. All fields are optional.',
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) planet: UpdatePlanetDto) {
    return await this.planetServise.update(id, planet);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Delete a planet',
    description: 'Deletes a planet by its ID. Returns true if deletion was successful. Admin only',
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.planetServise.delete(id);
  }
}
