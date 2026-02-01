import { Body, Controller, Post, Get, Put, Delete, ParseIntPipe, Param, ValidationPipe, Query, UseGuards } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Vehicle } from './vehicle.entity';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { RoleGuard } from 'src/auth/guards/role.guards';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { VehicleMapper } from './mapper/vehicle.mapper';

@ApiBearerAuth()
@ApiTags('Vehicles')
@Controller('vehicles')
@UseGuards(AuthGuard, RoleGuard)
export class VehicleController {
  constructor(private readonly VehicleServise: VehicleService) {}

  @Get()
  @Roles(Role.Admin, Role.User)
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOperation({ summary: 'Get vehicles', description: 'Returns all vehicles or a paginated list' })
  async get(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<Vehicle[]> {
    if (!page && !limit) {
      return this.VehicleServise.getAll();
    }
    return this.VehicleServise.getSeveral(page || 1, limit || 10);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'Get vehicle by ID', description: 'Returns a single vehicle or null if not found' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.VehicleServise.getOne(id);
  }

  @Post()
  @Roles(Role.Admin)
  @ApiBody({ type: CreateVehicleDto })
  @ApiOperation({ summary: 'Create vehicle', description: 'Adds a new vehicle to the database' })
  async create(@Body() vehicle: CreateVehicleDto) {
    const peyload = VehicleMapper.createVehiclePeyload(vehicle);
    return await this.VehicleServise.create(peyload);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @ApiBody({ type: UpdateVehicleDto })
  @ApiOperation({ summary: 'Update vehicle', description: 'Updates an existing vehicle by ID. Admin only. All fields are optional.' })
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) vehicle: UpdateVehicleDto) {
    return this.VehicleServise.update(id, vehicle);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete vehicle', description: 'Deletes a vehicle by ID. Returns true if successful' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.VehicleServise.delete(id);
  }
}
