import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
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
}
