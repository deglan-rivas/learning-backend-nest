import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dtos';
import { Car } from './interfaces/car.interface';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuidv4(),
      brand: 'Toyota',
      name: 'T1',
    },
    {
      id: uuidv4(),
      brand: 'Jepeeta',
      name: 'J1',
    },
    {
      id: uuidv4(),
      brand: 'Tokio',
      name: 'T2',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    return car;
  }

  createCar(createCarDto: CreateCarDto): Car {
    const car: Car = {
      id: uuidv4(),
      ...createCarDto,
    };

    this.cars.push(car);

    return car;
  }

  updateCar(id: string, updateCarDto: UpdateCarDto): Car {
    const currentCar = this.findOneById(id);
    const updatedCar = { ...currentCar, ...updateCarDto, id };
    this.cars = this.cars.map((car) => (car.id === id ? updatedCar : car));
    return updatedCar;
  }

  deleteCar(id: string): void {
    this.findOneById(id);

    this.cars = this.cars.filter((car) => car.id !== id);
  }
}
