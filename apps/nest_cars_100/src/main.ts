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
