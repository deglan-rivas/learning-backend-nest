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

// decorador de validación
// import {
//   registerDecorator,
//   ValidationOptions,
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
//   ValidationArguments,
// } from 'class-validator';

// @ValidatorConstraint({ async: false })
// class NotContainsConstraint implements ValidatorConstraintInterface {
//   validate(value: any, args: ValidationArguments) {
//     const [forbiddenCharacters] = args.constraints;
//     return typeof value === 'string' && !forbiddenCharacters.some(char => value.includes(char));
//   }

//   defaultMessage(args: ValidationArguments) {
//     return `The value contains an invalid character: ${args.constraints[0].join(', ')}`;
//   }
// }

// function NotContainsAny(forbiddenCharacters: string[], validationOptions?: ValidationOptions) {
//   return function (object: Object, propertyName: string) {
//     registerDecorator({
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       constraints: [forbiddenCharacters],
//       validator: NotContainsConstraint,
//     });
//   };
// }

// uso
// import { IsString, IsNotEmpty } from 'class-validator';

// export class CreateProductDto {
//   @IsString()
//   @IsNotEmpty()
//   @NotContainsAny([' ', '/', '|', '\\'], { message: 'Contains forbidden characters' })
//   slug: string;
// }

// decorador de transformación
// import { Transform } from 'class-transformer';

// function Slugify(options?: { from: string }) {
//   return Transform(({ value, obj }) => {
//     if (!value && options?.from) {
//       value = obj[options.from];
//     }
//     return value
//       ? value
//         .toLowerCase()
//         .replace(/\s/g, '_') // Replace all spaces with underscores
//         .replace(/'/g, '') // Remove all apostrophes
//       : value;
//   });
// }

// uso
// import { IsString, IsNotEmpty } from 'class-validator';

// export class CreateProductDto {
//   @IsString()
//   @IsNotEmpty()
//   title: string;

//   @IsString()
//   @Slugify({ from: 'title' })
//   slug: string;
// }
