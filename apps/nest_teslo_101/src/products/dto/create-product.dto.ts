import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  // @IsString({ each: true })
  @IsNumber()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @IsOptional()
  // @IsString({ each: true })
  @IsString()
  @IsNotEmpty()
  // @NotContains(' ', { message: 'No spaces allowed in slug property' })
  // @NotContains('/')
  // @NotContains('"')
  // @NotContains("'")
  // @Transform(({ value }) => value.toLowerCase())
  // @ArrayNotContains(['"', '|', "'"])
  // @Slugify({ from: 'title' })
  slug?: string;

  @IsString({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  sizes: string[];

  @IsString()
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @IsString({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  tags: string[];
}
