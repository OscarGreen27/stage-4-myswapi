import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateFilmDto } from 'src/film/dto/update-film.dto';
import { FilmService } from 'src/film/film.service';
import { UpdatePeopleDto } from 'src/people/dto/update-people.dto';
import { PeopleService } from 'src/people/people.service';
import { UpdatePlanetDto } from 'src/planet/dto/update-planet.dto';
import { PlanetService } from 'src/planet/planet.service';
import { UpdateSpecieDto } from 'src/specie/dto/update-specie.dto';
import { SpecieService } from 'src/specie/specie.service';
import { UpdateStarshipDto } from 'src/starship/dto/update-starship.dto';
import { StarshipService } from 'src/starship/starship.service';
import { UpdateVehicleDto } from 'src/vehicle/dto/update-vehicle.dto';
import { VehicleService } from 'src/vehicle/vehicle.service';

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
  async getEntityImagesByType(type: string, id: number) {
    switch (type) {
      case 'people':
        return await this.peopleService.getImages(id);
      case 'films':
        return await this.filmService.getImages(id);
      case 'planets':
        return await this.planetService.getImages(id);
      case 'species':
        return await this.specieService.getImages(id);
      case 'starships':
        return await this.starshipService.getImages(id);
      case 'vehicles':
        return await this.vehicleService.getImages(id);
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
  async updateEntityImages(
    id: number,
    type: string,
    images: string[],
    //entity: UpdatePeopleDto | UpdateFilmDto | UpdatePlanetDto | UpdateSpecieDto | UpdateStarshipDto | UpdateVehicleDto,
  ) {
    if (type === 'people') {
      const updPersone = new UpdatePeopleDto();
      updPersone.images = images;
      await this.peopleService.update(id, updPersone);
    } else if (type === 'films') {
      const updFilm = new UpdateFilmDto();
      updFilm.images = images;
      await this.filmService.update(id, updFilm);
    } else if (type === 'planets') {
      const updPlanet = new UpdatePlanetDto();
      updPlanet.images = images;
      await this.planetService.update(id, updPlanet);
    } else if (type === 'species') {
      const updSpecie = new UpdateSpecieDto();
      updSpecie.images = images;
      await this.specieService.update(id, updSpecie);
    } else if (type === 'starships') {
      const updStarship = new UpdateStarshipDto();
      updStarship.images = images;
      await this.starshipService.update(id, updStarship);
    } else if (type === 'vehicles') {
      const updVehicle = new UpdateVehicleDto();
      updVehicle.images = images;
      await this.vehicleService.update(id, updVehicle);
    }
  }
}
