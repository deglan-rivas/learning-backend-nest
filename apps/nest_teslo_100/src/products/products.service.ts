import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductImage } from './entities';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // this.logger.log(`createProductDto: ${JSON.stringify(createProductDto)}`);

    try {
      // const product = this.productRepository.create(createProductDto);

      const { images = [], ...productDetails } = createProductDto;
      const product = this.productRepository.create({
        ...productDetails,
        images: images.map((image) =>
          this.productImageRepository.create({ url: image }),
        ),
      });

      await this.productRepository.save(product);

      this.logger.log('Product created successfully');
      return product;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, skip = 0 } = paginationDto;
    const products = await this.productRepository.find({
      take: limit,
      skip,
      relations: {
        images: true,
      },
    });

    return products.map((product) => ({
      ...product,
      images: product.images.map((image) => image.url),
    }));
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    // this.logger.log(product);
    if (!product)
      throw new BadRequestException(`Product with id: ${id} not found`);
    return product;
  }

  async findOnePlain(id: string) {
    const { images = [], ...rest } = await this.findOne(id);
    return {
      ...rest,
      images: images.map((image) => image.url),
    };
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    // 2 golpes a db o productRepository
    // const product = await this.productRepository.preload({
    //   id,
    //   ...updateProductDto,
    // });

    // if (!product)
    //   throw new NotFoundException(`Product with id: ${id} not found`);

    // try {
    //   await this.productRepository.save(product);
    //   return product;
    // } catch (error) {
    //   this.handleDBExceptions(error);
    // }

    // 1 golpe a db o productRepository - no se puede xd si hay que mostrar usando el returno, entonces deben ser al menos 2 golpes, por DDL
    // con update
    // const response = await this.productRepository.update(
    //   { id },
    //   updateProductDto,
    // );
    // console.log(response);
    // if (response.affected === 0) {
    //   throw new NotFoundException(`Product with id: ${id} not found`);
    // }
    // return await this.productRepository.findOneBy({ id });

    // con findOne
    const product = await this.findOne(id);

    return await this.productRepository.save({
      ...product,
      ...updateProductDto,
    });
  }

  async remove(id: string): Promise<void> {
    const response = await this.productRepository.delete({ id });

    // console.log(response);
    // this.logger.log(JSON.stringify(response));
    // this.logger.log(`${JSON.stringify(response)}`);
    // this.logger.log(`${response}`);

    if (response.affected === 0) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }
  }

  private handleDBExceptions(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException('Check server logs');
    // console.log(error);
    // throw new Error('Check server logs');
  }
}
