import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {
  private cars = [
    {
      id: 1,
      brand: 'Toyota',
      name: 'T1',
    },
    {
      id: 2,
      brand: 'Jepeeta',
      name: 'J1',
    },
    {
      id: 3,
      brand: 'Tokio',
      name: 'T2',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: number) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    return car;
  }
}
