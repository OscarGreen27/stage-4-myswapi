import { Body, Controller, Post, Get, Put, Delete, ParseIntPipe, Param, ValidationPipe, Query, UseGuards } from '@nestjs/common';
import { SpecieService } from './specie.service';
import { CreateSpecieDto } from './dto/create-specie.dto';
import { UpdateSpecieDto } from './dto/update-specie.dto';

import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Species } from './specie.entity';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { RoleGuard } from 'src/auth/guards/role.guards';
import { SpecieMapper } from './mapper/specie.mapper';

@ApiBearerAuth()
@ApiTags('Specie')
@Controller('species')
@UseGuards(AuthGuard, RoleGuard)
export class SpecieController {
  constructor(private readonly specieServise: SpecieService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @Roles(Role.Admin, Role.User)
  @ApiOperation({
    summary: 'Get a list of species',
    description: 'Returns all species or a paginated list',
  })
  async get(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<Species[]> {
    if (!page && !limit) {
      return this.specieServise.getAll();
    }
    return this.specieServise.getSeveral(page || 1, limit || 10);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User)
  @ApiOperation({
    summary: 'Get a specie by ID',
    description: 'Returns a single specie entity by its ID, or null if not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.specieServise.getOne(id);
  }

  //alowed from admin only

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Create a new specie',
    description: 'Adds a new specie to the database. Only accessible by Admin users',
  })
  async create(@Body() specie: CreateSpecieDto) {
    const peyload = SpecieMapper.createSpecieMapper(specie);
    return await this.specieServise.create(peyload);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Update a specie',
    description: 'Updates an existing specie by its ID with the provided data. Admin only. All fields are optional.',
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) specie: UpdateSpecieDto) {
    return this.specieServise.update(id, specie);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Delete a specie',
    description: 'Deletes a specie by its ID. Returns true if deletion was successful. Admin only',
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.specieServise.delete(id);
  }
}
