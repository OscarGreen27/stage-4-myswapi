import { Body, Controller, Post, Get, Put, Delete, ParseIntPipe, Param, ValidationPipe, Query, UseGuards } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Vehicles } from './vehicle.entity';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { RoleGuard } from 'src/auth/guards/role.guards';

@ApiBearerAuth()
@ApiTags('Vehicles')
@Controller('vehicles')
@UseGuards(AuthGuard, RoleGuard)
export class VehicleController {
  constructor(private readonly VehicleServise: VehicleService) {}

  /**
   *function request handler get to endpoint vehicles.
   *if pagination parameters are not specified, default parameters will be used
   * @param page page number
   * @param limit number of objects on one page
   * @returns array of entities vehicles
   */
  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async get(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<Vehicles[]> {
    if (!page && !limit) {
      return this.VehicleServise.getAll();
    }
    return this.VehicleServise.getSeveral(page || 1, limit || 10);
  }

  /**
   * function processes the request with the id parameter
   * @param id vehicle id
   * @returns entity vehicle if there is a match by id, null if there is no corresponding id in the database
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.VehicleServise.getOne(id);
  }

  /**
   *The function processes a request to create a new vehicle in the database.
   * @param film object with fields that correspond to CreateFilmDto
   * @returns void
   */
  @Post()
  async create(@Body() vehicle: CreateVehicleDto) {
    return await this.VehicleServise.create(vehicle);
  }

  /**
   *put query handler function for editing entities vehicle
   * @param id vehicle ID to which changes need to be made
   * @param vehicle object with new values for a specific film
   * @returnsa vehicle with new meanings
   */
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) vehicle: UpdateVehicleDto) {
    return this.VehicleServise.update(id, vehicle);
  }

  /**
   * vehicle delete request handler function
   * @param id vehicle id
   * @returns true if vehicle deleted success, false if not
   */
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.VehicleServise.delete(id);
  }
}
