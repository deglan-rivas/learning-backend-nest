import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuidv4(),
    //   brand: 'Toyota',
    //   name: 'Corolla',
    // },
  ];

  create(createCarDto: CreateCarDto): Car {
    const car: Car = {
      id: uuidv4(),
      // brand: createCarDto.name,
      // name: createCarDto.brand,
      ...createCarDto,
    };

    this.cars = [...this.cars, car];
    return car;
  }

  findAll(): Car[] {
    return this.cars;
  }

  findOne(id: string): Car {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto): Car {
    // let carDB = this.findOne(id);
    // this.cars = this.cars.map((car) => {
    //   if (car.id === carDB.id) {
    //     carDB = {
    //       ...carDB,
    //       ...updateCarDto,
    //       id,
    //     };
    //     return carDB;
    //   }
    //   return car;
    // });
    // return carDB;
    const carDB = this.findOne(id);
    const updatedCar = { ...carDB, ...updateCarDto };
    this.cars = this.cars.map((car) => (car.id === id ? updatedCar : car));
    return updatedCar;
  }

  remove(id: string): void {
    const carDB = this.findOne(id);
    this.cars = this.cars.filter((car) => car.id !== carDB.id);
    return;
  }

  fillWithSeed(seed: Car[]): void {
    this.cars = seed;
  }
}
