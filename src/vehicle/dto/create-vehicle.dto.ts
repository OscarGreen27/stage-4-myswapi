import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransportCreateDto } from 'src/dto/create-dto/transport-create.dto';

export class CreateVehicleDto extends TransportCreateDto {
  @ApiProperty({ example: 'Light freighter', description: 'Class of the vehicle', type: String })
  @IsString()
  @MaxLength(24)
  vehicle_class: string;
}
