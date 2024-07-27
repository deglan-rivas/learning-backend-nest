import { Controller, Get, Param } from '@nestjs/common';

@Controller('cars')
export class CarsController {
  private cars = ['Toyota', 'Jepeeta', 'Tokio'];

  @Get()
  getAllCars() {
    return this.cars;
  }

  // @Get(':id')
  // getCarById(id: number) {
  //   return this.cars[id];
  // }

  @Get(':id/:brand')
  getCarByIdAndBrand(@Param('id') id: string, @Param('brand') brand: string) {
    console.log({ id, brand });
    return `${this.cars[+id]} - ${brand}`;
    // return this.cars[+id];
  }
}
