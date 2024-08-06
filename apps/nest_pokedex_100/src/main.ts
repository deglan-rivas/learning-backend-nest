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
  console.log(`app running on port ${process.env.PORT_EXAMPLE}`);
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

// nest cap9 batch2
// instalar pnpm i joi
// crear el joi.validation.ts
// agregar el obj con la validación de cada uno -> este es el primer filtro y las añade como str
// setear el config en el mismo nivel que el loader -> recordar hacer la conversión en loader o seguirá como string, joiSchema afecta antes de ir al loader
// agregar Creación de env var en el readme.md
// crear un nuevo servicio en railway -> add service, escoger mongodb, copiar la MONGO_URI a nuestr env file y correrlo para ejecutar el seed
// para desplegar crear nuevo servicios de railway, en local cambiar comandos clásicos por build y start que todo host reconoce, subirlo a github, enlazarlo railway con github, parar el deploy, cambiar a la rama x si no es main, agregar env vars ez, redeploy nomás
// yo prefiero dockerizarlo xd -> crear Dockerfile, .dockerignore, leer monostage multistage y docker-compose.prod.yml -> entender cada paso de node_modules deps build y correr en prod, usar el .env.prod, especificarlo en el docker compose -f x -e x --build y -d, ignorar el .env.prod en .gitignore -> solo falta persistir la data con volumes y entrar al container para ver si se nos escapó algún file privado como .env o .env.prod en .dockerignore xD -> notar que su pokeapp pesa 400MB el mío 140 creo xD
// crear el production build en el readme.md

// TODO para la próxima solo permitir un mongoid que debería tenerlo el componente de react que use un .forEach, así creamos un pipe en el backend de nest y golpeamos una sola vez a la mongodb en lugar de hasta 3 como hacemos ahora en el getOneById del .service.ts xd

// pokedex_101
// al inyectar la dep en el seed que el constructor use un AxiosAdapter y no un HttpInterface xD
// en el common.module del 101 solo se puede usar providers para los Adapters, imports no, parece que en imports solo van Modules como en el app, no se entiende bien la diferencia xD -> https://stackoverflow.com/questions/73751658/what-is-the-difference-between-providers-and-imports-in-nestjs
// en mi pokemon.entity que según nest docs debería ser schema/pokemon.schema.ts xd no hay ningún extends Document como el original xd parece que nest docs 2020 a 2024 cambió
// nest docs configuration tiene mayor info de cómo tipar el configService, incluso usarlo como .yaml xd
// notar que si comentamos el JoiValidationSchema los typeof de todas las env vars importadas en pokemon.service.ts dan string xD por eso mejor siempre usar joi incluso is es repetitivo -> https://dev.to/one-beyond/how-to-configure-and-use-environment-variables-in-nestjs-3cm2 -> https://oyugoobonyo.medium.com/uploading-files-in-nestjs-eeec53883696 -> clean architecture nest: https://medium.com/@jonathan.pretre91/clean-architecture-with-nestjs-e089cef65045 -> https://github.com/royib/clean-architecture-nestJS -> https://github.com/wesleey/nest-clean-architecture

// resumen pokedex_101
// nest new
// nest g res common pokemon seed
// global prefix
// static content
// global validation pipes
// mongo schema según nestjs docs
// carpintería de crud pokemon con mongodb: custom pipes, interfaces y adapters
// seed, axios, interfaces
// paginación, dto
// env vars loader, joiSchema, dockerfile, docker-compose y readme
