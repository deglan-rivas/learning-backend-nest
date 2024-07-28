import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [];

  create(createBrandDto: CreateBrandDto): Brand {
    const brand: Brand = {
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
    const car = this.brands.find((brand) => brand.id === id);

    if (!car) throw new NotFoundException(`Brand with id ${id} not found`);

    return car;
  }

  update(id: string, updateBrandDto: UpdateBrandDto): Brand {
    const brandDB = this.findOne(id);
    const updatedBrand = {
      ...brandDB,
      ...updateBrandDto,
      updatedAt: new Date().getTime(),
    };

    this.brands = this.brands.map((brand) => {
      if (brand.id === id) {
        return updatedBrand;
      }
      return brand;
    });

    return updatedBrand;
  }

  remove(id: string): void {
    this.findOne(id);

    this.brands = this.brands.filter((brand) => brand.id !== id);
    return;
  }

  fillWithSeed(brandSeed: Brand[]): void {
    this.brands = brandSeed;
  }
}
