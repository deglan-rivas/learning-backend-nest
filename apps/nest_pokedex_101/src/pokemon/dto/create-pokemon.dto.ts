import {
  IsLowercase,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  @IsNotEmpty()
  @IsLowercase()
  name: string;

  @IsNumber()
  @Min(1)
  no: number;
}
