import { Body, Controller, Post, Get, Put, Delete, ParseIntPipe, Param, ValidationPipe, Query, UseGuards } from '@nestjs/common';
import { StarshipService } from './starship.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';

import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Starships } from './starship.entity';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { RoleGuard } from 'src/auth/guards/role.guards';
import { StarshipMapper } from './mapper/starship.mapper';

@ApiBearerAuth()
@ApiTags('Starships')
@Controller('starships')
@UseGuards(AuthGuard, RoleGuard)
export class StarshipController {
  constructor(private readonly starshipServise: StarshipService) {}

  @Get()
  @Roles(Role.Admin, Role.User)
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOperation({
    summary: 'Get a list of starships',
    description: 'Returns all starships or a paginated list if page and limit query parameters are provided',
  })
  async get(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<Starships[]> {
    if (!page && !limit) {
      return this.starshipServise.getAll();
    }
    return this.starshipServise.getSeveral(page || 1, limit || 10);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User)
  @ApiOperation({
    summary: 'Get a starship by ID',
    description: 'Returns a single starship entity by its ID. Returns null if the starship is not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.starshipServise.getOne(id);
  }

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Create a new starship',
    description: 'Adds a new starship to the database. Admin role required',
  })
  async create(@Body() starship: CreateStarshipDto) {
    const peyload = StarshipMapper.createStarshipPeyload(starship);
    return await this.starshipServise.create(peyload, starship.relations);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Update a starship',
    description: 'Updates an existing starship by its ID. Admin role required. All fields are optional.',
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) film: UpdateStarshipDto) {
    return this.starshipServise.update(id, film);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Delete a starship',
    description: 'Deletes a starship by its ID. Returns true if deletion was successful. Admin role required',
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.starshipServise.delete(id);
  }
}
