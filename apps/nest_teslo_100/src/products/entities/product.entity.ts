import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column('float', { default: 0 })
  price: number;

  @Column({
    type: 'int',
    default: 0,
  })
  stock: number;

  @Column('text', { unique: true })
  slug: string;

  @Column({
    type: 'text',
    array: true,
    // default: [],
  })
  sizes: string[];

  @Column({
    type: 'text',
    enum: ['men', 'women', 'kid', 'unisex'],
    // default: 'unisex',
  })
  gender: string;

  @Column({
    type: 'text',
    array: true,
    // default: [],
  })
  tags: string[];

  // images
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @BeforeInsert()
  // @BeforeUpdate()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
