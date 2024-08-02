import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    // {
    //   id: uuidv4(),
    //   name: 'Audi',
    //   createdAt: new Date().getTime(),
    // },
    // {
    //   id: uuidv4(),
    //   name: 'Ford',
    //   createdAt: new Date().getTime(),
    // },
    // {
    //   id: uuidv4(),
    //   name: 'Volvo',
    //   createdAt: new Date().getTime(),
    // },
  ];

  create(createBrandDto: CreateBrandDto): Brand {
    const brand = {
      id: uuidv4(),
      ...createBrandDto,
      createdAt: new Date().getTime(),
    };

    this.brands = [...this.brands, brand];
    return brand;
  }

  findAll(): Brand[] {
    return this.brands;
  }

  findOne(id: string): Brand {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);

    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto): Brand {
    console.log(updateBrandDto);
    const brandDB = this.findOne(id);
    const updateBrand = {
      ...brandDB,
      ...updateBrandDto,
      updatedAt: new Date().getTime(),
    };

    this.brands = this.brands.map((brand) =>
      brand.id === id ? updateBrand : brand,
    );
    return updateBrand;
  }

  remove(id: string): void {
    this.findOne(id);
    this.brands = this.brands.filter((brand) => brand.id !== id);
    return;
  }

  fillWithSeed(seed: Brand[]): void {
    this.brands = seed;
  }
}
