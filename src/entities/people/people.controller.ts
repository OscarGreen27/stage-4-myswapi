import { Body, Controller, Post, Get, ParseIntPipe, Param, Put, Delete, NotFoundException, Query, UseGuards } from '@nestjs/common';
import { PeopleService } from './people.service';
import { People } from './people.entity';
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';

import { ApiTags, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import * as path from 'path';
import * as fs from 'fs';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { RoleGuard } from 'src/auth/guards/role.guards';

@ApiBearerAuth()
@ApiTags('People')
@Controller('people')
@UseGuards(AuthGuard, RoleGuard)
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  /**
   *function request handler get to endpoint people.
   *if pagination parameters are not specified, default parameters will be used
   * @param page page number
   * @param limit number of objects on one page
   * @returns array of people entity
   */
  @Get()
  @Roles(Role.Admin, Role.User)
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async get(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<People[]> {
    if (!page && !limit) {
      return this.peopleService.getAll();
    }
    return this.peopleService.getSeveral(page || 1, limit || 10);
  }

  /**
   * function processes the request with the id parameter
   * @param id people id
   * @returns entity people if there is a match by id, null if there is no corresponding id in the database
   */
  @Get(':id')
  @Roles(Role.Admin, Role.User)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<People> {
    const result = await this.peopleService.getOne(id);

    if (!result) throw new NotFoundException(`The Persone from the ${id} was not found.`);

    return result;
  }

  //alows from admin only

  /**
   *The function processes a request to create a new person in the database.
   * @param persone object with fields that correspond to CreatePeopleDto
   * @returns void
   */
  @Post()
  @Roles(Role.Admin)
  async create(@Body() persone: CreatePeopleDto) {
    return await this.peopleService.create(persone);
  }

  /**
   *put query handler function for editing entities people
   * @param id people ID to which changes need to be made
   * @param persone object with new values for a specific persone
   * @returnsa persone with new meanings
   */
  @Put(':id')
  @Roles(Role.Admin)
  async update(@Param('id', ParseIntPipe) id: number, @Body() persone: UpdatePeopleDto) {
    const result = await this.peopleService.update(id, persone);

    if (!result) throw new NotFoundException(`Not updated. The Person from the ${id} was not found.`);

    return result;
  }

  /**
   * people delete request handler function
   * @param id persone id
   * @returns true if people deleted success, false if not
   */
  @Delete(':id')
  @Roles(Role.Admin)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    fs.rm(path.join(process.cwd(), 'uploads', 'people', `${String(id)}`), { recursive: true, force: true }, (err) => {
      if (err) console.log(err);
    });
    return await this.peopleService.delete(id);
  }
}
