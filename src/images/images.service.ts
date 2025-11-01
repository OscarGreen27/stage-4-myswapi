import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateFilmDto } from 'src/entities/film/dto/update-film.dto';
import { FilmService } from 'src/entities/film/film.service';
import { UpdatePeopleDto } from 'src/entities/people/dto/update-people.dto';
import { PeopleService } from 'src/entities/people/people.service';
import { UpdatePlanetDto } from 'src/entities/planet/dto/update-planet.dto';
import { PlanetService } from 'src/entities/planet/planet.service';
import { UpdateSpecieDto } from 'src/entities/specie/dto/update-specie.dto';
import { SpecieService } from 'src/entities/specie/specie.service';
import { UpdateStarshipDto } from 'src/entities/starship/dto/update-starship.dto';
import { StarshipService } from 'src/entities/starship/starship.service';
import { UpdateVehicleDto } from 'src/entities/vehicle/dto/update-vehicle.dto';
import { VehicleService } from 'src/entities/vehicle/vehicle.service';

/**
 *class for working with user entities
 */
@Injectable()
export class ImagesService {
  constructor(
    private readonly peopleService: PeopleService,
    private readonly filmService: FilmService,
    private readonly planetService: PlanetService,
    private readonly specieService: SpecieService,
    private readonly starshipService: StarshipService,
    private readonly vehicleService: VehicleService,
  ) {}

  /**
   * The function retrieves a record from the database according to the passed parameters.
   * @param type entity type. The name must match the name of the table in the database
   * @param id entity id
   * @returns entity
   */
  async getEntityByType(type: string, id: number) {
    switch (type) {
      case 'people':
        return await this.peopleService.getOne(id);
      case 'films':
        return await this.filmService.getOne(id);
      case 'planets':
        return await this.planetService.getOne(id);
      case 'species':
        return await this.specieService.getOne(id);
      case 'starships':
        return await this.starshipService.getOne(id);
      case 'vehicles':
        return await this.vehicleService.getOne(id);
      default:
        throw new NotFoundException(`${type} is invalid entity type!`);
    }
  }
  /**
   * the function checks if the entity exists in the corresponding table using the id
   * @param id entity id
   * @param type entity type. The name must match the name of the table in the database
   * @returns true if entity exist, false if not
   */
  async checkExisting(id: number, type: string) {
    switch (type) {
      case 'people':
        return await this.peopleService.itExist(id);
      case 'films':
        return await this.filmService.itExist(id);
      case 'planets':
        return await this.planetService.itExist(id);
      case 'species':
        return await this.specieService.itExist(id);
      case 'starships':
        return await this.starshipService.itExist(id);
      case 'vehicles':
        return await this.vehicleService.itExist(id);
      default:
        throw new NotFoundException(`${type} is invalid entity type!`);
    }
  }

  /**
   * the function stores a link to the image in the image array of the corresponding entityА
   * @param id entity id
   * @param type entity type. The name must match the name of the table in the database
   * @param url image link
   * @returns true if the link is saved, false if not
   */
  async saveToDb(id: number, type: string, url: string) {
    switch (type) {
      case 'people':
        return await this.peopleService.saveImage(id, url);
      case 'films':
        return await this.filmService.saveImage(id, url);
      case 'planets':
        return await this.planetService.saveImage(id, url);
      case 'species':
        return await this.specieService.saveImage(id, url);
      case 'starships':
        return await this.starshipService.saveImage(id, url);
      case 'vehicles':
        return await this.vehicleService.saveImage(id, url);
    }
  }

  /**
   * function gets the image key from the url
   * @param  url URL containing the image key
   * @returns image key
   */
  extractS3KeyFromUrl(url: string): string {
    const match = url.match(/\.amazonaws\.com\/(.+)$/);
    if (!match) {
      throw new NotFoundException('Invalid S3 URL!');
    }
    return match[1];
  }

  /**
   * the function updates the record in the corresponding table.
   * needed to update the records in the database after a new link has been added to the image array
   * @param type entity type. The name must match the name of the table in the database
   * @param id entity id
   * @param entity object with updated fields
   * @returns updated entity
   */
  async updateEntityByType(
    type: string,
    id: number,
    entity: UpdatePeopleDto | UpdateFilmDto | UpdatePlanetDto | UpdateSpecieDto | UpdateStarshipDto | UpdateVehicleDto,
  ) {
    if (entity instanceof UpdatePeopleDto) {
      return await this.peopleService.update(id, entity);
    } else if (entity instanceof UpdateFilmDto) {
      return await this.filmService.update(id, entity);
    } else if (entity instanceof UpdatePlanetDto) {
      return await this.planetService.update(id, entity);
    } else if (entity instanceof UpdateSpecieDto) {
      return this.specieService.update(id, entity);
    } else if (entity instanceof UpdateStarshipDto) {
      return this.starshipService.update(id, entity);
    } else if (entity instanceof UpdateVehicleDto) {
      return this.vehicleService.update(id, entity);
    } else {
      throw new NotFoundException('New entity is invalid');
    }
  }
}
