import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // app.enableCors({
  //   origin: 'http://localhost:3000', // O el dominio de tu frontend
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   allowedHeaders: 'Content-Type, Accept',
  // });

  await app.listen(3000);
}
bootstrap();

// para el  update del pokemon.service se puede retornar un Promise<Partial<Pokemon>> o inicializar instanciando la data en el constructor del Pokemon para retornar un obj o isntancia Pokemon o el toJSON() del pokemon escogido o mejor hacer que solo se busque por mongo id / pokemon id y quitamos los index cosa que así podemos hacer un findOne o findOneAndUpdate y comparamos las rows actualizadas para mandar un error si no se actualiza ninguna xd se sigue respetando el erro 11000 de paso -> esta última me parece la mejor, manqueé al permitir el id name y mongoid :'v
// siempre tratar de hacer una sola consulta para no golpear tanto a la db, por eso prefiero pgsql a los orm y odm, aunque vi que prisma permite hacer raw queries
// postman se loquea y devolvía error de cors, pero era solo que me había dado log out por inactividad xd
// si hay alguna referencia del axios, hay que romperla con el spread operator como pasó con data -> Converting circular structure to JSON
//     --> starting at object with constructor 'ClientRequest'
//     |     property 'res' -> object with constructor 'IncomingMessage'
//     --- property 'req' closes the circle
// TypeError: Converting circular structure to JSON
//     --> starting at object with constructor 'ClientRequest'
//     |     property 'res' -> object with constructor 'IncomingMessage'
//     --- property 'req' closes the circle
//     at JSON.stringify (<anonymous>)
//     at stringify (/home/deglan/Escritorio/practicas_random/learning-backend-nest/node_modules/.pnpm/express@4.19.2/node_modules/express/lib/response.js:1159:12)
// se soluciona con un {...data} para romper la referencia, igual está raro xd
// en lugar de buscar alguna forma de usar el @Injectable, mejor exportar el adapter desde el common e importarlo en el seed module
// chatgpt me ayudó a saber que olvidé exportar el pokemon model con exports: [MongooseModule], en el pokemon.module.ts
// lo mejor es tipar las salidas de las funciones al final cuando todo ya es funcional. sino el desarrollo se hace muy lento
// node 18 tiene el fetch :o
// notar que nest tiene su propia implementación de axios como dice una respuesta de la nota

// TODO para la próxima solo permitir un mongoid que debería tenerlo el componente de react que use un .forEach, así creamos un pipe en el backend de nest y golpeamos una sola vez a la mongodb en lugar de hasta 3 como hacemos ahora en el getOneById del .service.ts xd
