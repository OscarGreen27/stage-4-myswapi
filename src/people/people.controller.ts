import { Body, Controller, Post, Get, ParseIntPipe, Param, Put, Delete, NotFoundException, Query, UseGuards } from '@nestjs/common';
import { PeopleService } from './people.service';
import { People } from './people.entity';
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';

import { ApiTags, ApiQuery, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import * as path from 'path';
import * as fs from 'fs';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { RoleGuard } from 'src/auth/guards/role.guards';
import { PeopleMapper } from './mapper/people.mapper';

@ApiBearerAuth()
@ApiTags('People')
@Controller('people')
@UseGuards(AuthGuard, RoleGuard)
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  @Roles(Role.Admin, Role.User)
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOperation({
    summary: 'Get list of people',
    description: 'Returns all people or a paginated list',
  })
  async get(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<People[]> {
    if (!page && !limit) {
      return this.peopleService.getAll();
    }
    return this.peopleService.getSeveral(page || 1, limit || 10);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User)
  @ApiOperation({
    summary: 'Get a single person by ID',
    description: 'Returns one person if exists, otherwise throws 404',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<People> {
    const result = await this.peopleService.getOne(id);

    if (!result) throw new NotFoundException(`The Persone from the ${id} was not found.`);

    return result;
  }

  //alows from admin only

  @Post()
  @Roles(Role.Admin)
  @Post()
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Create a new person',
    description: 'Adds a new person to the database. Admin only',
  })
  async create(@Body() persone: CreatePeopleDto) {
    const payload = PeopleMapper.createPeyload(persone);
    return await this.peopleService.create(payload, persone.relations);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Update an existing person',
    description: 'Updates a person by ID with provided data. Admin only. All fields are optional.',
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() persone: UpdatePeopleDto) {
    const result = await this.peopleService.update(id, persone);

    if (!result) throw new NotFoundException(`Not updated. The Person from the ${id} was not found.`);

    return result;
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Delete a person by ID',
    description: 'Deletes a person from the database and removes uploaded files. Admin only',
  })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    fs.rm(path.join(process.cwd(), 'uploads', 'people', `${String(id)}`), { recursive: true, force: true }, (err) => {
      if (err) console.log(err);
    });
    return await this.peopleService.delete(id);
  }
}
