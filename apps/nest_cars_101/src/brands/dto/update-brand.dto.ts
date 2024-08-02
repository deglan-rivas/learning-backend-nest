import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsOptional } from 'class-validator';
import { CreateBrandDto } from './create-brand.dto';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
  @IsOptional()
  @IsDateString()
  //@IsString()
  //@Type(() => Date)
  updatedAt?: Date;
}
