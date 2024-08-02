import { Injectable } from '@nestjs/common';
import { BrandsService } from 'src/brands/brands.service';
import { CarsService } from 'src/cars/cars.service';
import { BRAND_SEED, CAR_SEED } from './data';

@Injectable()
export class SeedService {
  constructor(
    private readonly carsService: CarsService,
    private readonly brandService: BrandsService,
  ) { }

  populateDB(): string {
    this.carsService.fillWithSeed(CAR_SEED);
    this.brandService.fillWithSeed(BRAND_SEED);
    return 'Seed executed';
  }
}
