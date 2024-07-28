import { Injectable } from '@nestjs/common';
import { BrandsService } from 'src/brands/brands.service';
import { CarsService } from 'src/cars/cars.service';
import { BRAND_SEED } from './data/brands.seed';
import { CAR_SEED } from './data/cars.seed';

@Injectable()
export class SeedService {
  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService,
  ) { }

  populateDB(): string {
    this.carsService.fillWithSeed(CAR_SEED);
    this.brandsService.fillWithSeed(BRAND_SEED);

    return 'Seed executed';
  }
}
