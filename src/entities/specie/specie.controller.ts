import { Body, Controller, Post, Get, Put, Delete, ParseIntPipe, Param, ValidationPipe, Query, UseGuards } from '@nestjs/common';
import { SpecieService } from './specie.service';
import { CreateSpecieDto } from './dto/create-specie.dto';
import { UpdateSpecieDto } from './dto/update-specie.dto';

import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Species } from './specie.entity';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { RoleGuard } from 'src/auth/guards/role.guards';

@ApiBearerAuth()
@ApiTags('Specie')
@Controller('species')
@UseGuards(AuthGuard, RoleGuard)
export class SpecieController {
  constructor(private readonly specieServise: SpecieService) {}

  /**
   *function request handler get to endpoint specie.
   *if pagination parameters are not specified, default parameters will be used
   * @param page page number
   * @param limit number of objects on one page
   * @returns array of entities specie
   */
  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @Roles(Role.Admin, Role.User)
  async get(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<Species[]> {
    if (!page && !limit) {
      return this.specieServise.getAll();
    }
    return this.specieServise.getSeveral(page || 1, limit || 10);
  }

  /**
   * function processes the request with the id parameter
   * @param id specie id
   * @returns entity specie if there is a match by id, null if there is no corresponding id in the database
   */
  @Get(':id')
  @Roles(Role.Admin, Role.User)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.specieServise.getOne(id);
  }

  //alowed from admin only

  /**
   *The function processes a request to create a new specie in the database.
   * @param film object with fields that correspond to CreateSpecieDto
   * @returns void
   */
  @Post()
  @Roles(Role.Admin)
  async create(@Body() specie: CreateSpecieDto) {
    return await this.specieServise.create(specie);
  }

  /**
   *put query handler function for editing entities specie
   * @param id specie ID to which changes need to be made
   * @param film object with new values for a specific specie
   * @returnsa specie with new meanings
   */
  @Put(':id')
  @Roles(Role.Admin)
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) specie: UpdateSpecieDto) {
    return this.specieServise.update(id, specie);
  }

  /**
   * specie delete request handler function
   * @param id specie id
   * @returns true if specie deleted success, false if not
   */
  @Delete(':id')
  @Roles(Role.Admin)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.specieServise.delete(id);
  }
}
