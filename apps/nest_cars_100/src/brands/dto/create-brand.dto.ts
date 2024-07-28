import { IsLowercase, IsString, MinLength } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @MinLength(1)
  @IsLowercase()
  name: string;
}
