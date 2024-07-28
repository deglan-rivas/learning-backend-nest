import { Brand } from 'src/brands/entities/brand.entity';
import { v4 as uuidv4 } from 'uuid';
export const BRAND_SEED: Brand[] = [
  {
    id: uuidv4(),
    name: 'Toyota',
    createdAt: new Date().getTime(),
  },
];
