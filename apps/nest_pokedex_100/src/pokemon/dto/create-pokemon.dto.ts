import {
  IsLowercase,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  @MinLength(1)
  @IsLowercase()
  name: string;

  @IsNumber()
  @Min(1)
  no: number;
}
