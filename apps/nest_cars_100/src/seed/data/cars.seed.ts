import { Car } from 'src/cars/interfaces/car.interface';
import { v4 as uuidv4 } from 'uuid';
export const CAR_SEED: Car[] = [
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
