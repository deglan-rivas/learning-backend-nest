import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  // private carService: CarsService = new CarsService();
  constructor(private readonly carService: CarsService) { }

  @Get()
  getAllCars() {
    return this.carService.findAll();
  }

  // @Get(':id')
  // getCarById(@Param('id') id: string) {
  //   return this.carService.findOneById(+id);
  // }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number) {
    return this.carService.findOneById(id);
  }

  // @Get(':id/:brand')
  // getCarByIdAndBrand(@Param('id') id: string, @Param('brand') brand: string) {
  //   console.log({ id, brand });
  //   return `${this.cars[+id]} - ${brand}`;
  // return this.cars[+id];

  @Post()
  createCar(@Body() body: any) {
    return {
      ...body,
    };
  }

  @Patch(':id')
  updateCar(@Body() body: any, @Param('id', ParseIntPipe) id: number) {
    return {
      ...body,
      id,
    };
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    return {
      id,
    };
  }
}
