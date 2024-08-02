import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();

// en el updateCar del .service.ts se puede usar un let car y desestructurar en sí mismo para ahorrar memoria en lugar de usar 2 const xd
// está bueno aplicar un poco de clean code para el naming de los métodos del car.service.ts
// el dto debe ser clase y no interface, porque no sabemos el id: uuid hasta que instanciamos, por eso en mi proyecto de react shoppingCart hice el cast usando el id?: string como param opcional xdddd ahora entiendo que debían ser 2 clases distintas v:

// interface parecido a class del entity pero sin instanciacion
// hay un tolowercase en el dto de create brand xd más adelante podré forzarlo a que se convierta
// las clases o dtos o interfaces se pueden importar sin declarar en el module.ts
// está bien que los cars y brands sean private, solo deben modificarse con el crud, por eso creamos un public method fillWithSeed
// no olvidar el pnpm build y pnpm start:prod como comando que debe ejectuar nuestro hosting tipo railway

// interface parecido a class del entity pero sin instanciacion
// hay un tolowercase en el dto de create brand xd más adelante podré forzarlo a que se convierta
// las clases o dtos o interfaces se pueden importar sin declarar en el module.ts
// está bien que los cars y brands sean private, solo deben modificarse con el crud, por eso creamos un public method fillWithSeed

// cars_101
// errores y aprendidos
// el private en el createCarDto evita que se pueda usar el spread ..., pues solo esparce las públicas -> removerlo en el create-car .dto
// en npm hay npm uuid y npm uuidv4 xD usamos el uuid que es el clásico con v4 v5 v3 también
// para este error: utilicé esta validación con pipes en nestjs:
// export class UpdateBrandDto extends PartialType(CreateBrandDto) {
//   @IsOptional()
//   @IsDate()
//   updatedAt?: Date;
// }
// pero cuando ingreso este body usando postman:
// {
//     //"brand": "Mercedesss",
//     "name": "MV6000",
//     "updatedAt": "2022-03-06T11:00:00.000Z"
//     // "id": "a3e3a229-5164-4ad6-8543-94211accd634"
// }
// me devuelve este error:
// {
//     "message": [
//         "updatedAt must be a Date instance"
//     ],
//     "error": "Bad Request",
//     "statusCode": 400
// }
// qué valor debe tener para que el Date instance sea válido?
// gpt sugiere usar el @Type o ahcer la validación manual del updateDto en el .service, pero la mejor solución es usar el @isDateString como dice este enlae https://stackoverflow.com/questions/71993277/how-to-validate-an-array-of-date-with-class-validator y el npm class-validator docs: gpt 0 - stackoverflow 1

// TODOs
