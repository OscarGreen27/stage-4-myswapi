import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { FilmsCharactersService } from './films_characters.service';
import { FilmsCharacterDto } from './film_character.dto';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { RoleGuard } from 'src/auth/guards/role.guards';

@ApiBearerAuth()
@ApiTags('Film_Character')
@Controller('film-character')
@UseGuards(AuthGuard, RoleGuard)
export class FilmsCharactersController {
  constructor(private readonly filmCharacterService: FilmsCharactersService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiBody({ type: FilmsCharacterDto, description: 'Film and Character IDs to link' })
  @ApiOperation({
    summary: 'Assign a character to a film',
    description: 'Creates a link between a film and a character. Admin only.',
  })
  async create(@Body('data') data: FilmsCharacterDto) {
    return await this.filmCharacterService.create(data);
  }

  @Delete()
  @Roles(Role.Admin)
  @ApiBody({ type: FilmsCharacterDto, description: 'Film and Character IDs to unlink' })
  @ApiOperation({
    summary: 'Remove a character from a film',
    description: 'Deletes the link between a film and a character. Admin only.',
  })
  async delete(@Body('data') data: FilmsCharacterDto) {
    return await this.filmCharacterService.delete(data);
  }
}
