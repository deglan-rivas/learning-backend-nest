import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dtos';

@Controller('cars')
@UsePipes(ValidationPipe)
export class CarsController {
  constructor(private readonly carService: CarsService) { }

  @Get()
  getAllCars() {
    return this.carService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseUUIDPipe) id: string) {
    return this.carService.findOneById(id);
  }

  @Post()
  createCar(@Body() body: CreateCarDto) {
    return {
      ...body,
    };
  }

  @Patch(':id')
  updateCar(@Body() body: any, @Param('id', ParseIntPipe) id: number) {
    return {
      id,
      ...body,
    };
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    return {
      id,
    };
  }
}
