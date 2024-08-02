import { Module } from '@nestjs/common';
import { BrandsModule } from './brands/brands.module';
import { CarsModule } from './cars/cars.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [BrandsModule, CarsModule, SeedModule],
})
export class AppModule { }
