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

// TODO para la próxima solo permitir un mongoid que debería tenerlo el componente de react que use un .forEach, así creamos un pipe en el backend de nest y golpeamos una sola vez a la mongodb en lugar de hasta 3 como hacemos ahora en el getOneById del .service.ts xd
