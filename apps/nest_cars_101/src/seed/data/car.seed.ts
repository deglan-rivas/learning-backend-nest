import { Car } from 'src/cars/entities/car.entity';
import { v4 as uuidv4 } from 'uuid';

export const CAR_SEED: Car[] = [
  {
    id: uuidv4(),
    brand: 'Toyota',
    name: 'Corolla',
  },
  {
    id: uuidv4(),
    brand: 'Honda',
    name: 'Civic',
  },
  {
    id: uuidv4(),
    brand: 'Ford',
    name: 'Focus',
  },
  {
    id: uuidv4(),
    brand: 'Chevrolet',
    name: 'Malibu',
  },
  {
    id: uuidv4(),
    brand: 'Tesla',
    name: 'Model 3',
  },
  {
    id: uuidv4(),
    brand: 'Nissan',
    name: 'Altima',
  },
  {
    id: uuidv4(),
    brand: 'BMW',
    name: '3 Series',
  },
  {
    id: uuidv4(),
    brand: 'Audi',
    name: 'A4',
  },
];
