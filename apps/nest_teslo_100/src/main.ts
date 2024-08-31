import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // transform: true,
      // transformOptions: {
      //   enableImplicitConversion: true,
      // },
    }),
  );
  await app.listen(3000);
}
bootstrap();

// teslo_100
// aprendidos
// el logger puede recibir el .name
// hay decoradores pipes que dejé sueltos, revisar el .entity y el create.dto
// se puede hacer que sizes también sea opcional en dto y tenga un default [] en .entity, la idea es que cuando el vendedor lo agregue tenga en la mente el nombre, el target y los tags, luego ya agrega colores tallas precios stock etc
// la conexión de datagrip tiene una db por default "postgres" por encima de nuestra tesloDB, por eso crear el query en db teslo y no en el nombre de la conexión, por eso al ejecutarse dice postgres.public que es la db postgres schema public y no encontraba la data con query, pese a que con doble click sí se muestra la data gráficamente
// el class-validator permite crear custom validators como se ve en el main para un NotContainsAny character en el main.ts para validación o transformación from title : o mi ejemplo está interesante porque además el updateDto sobreescribe el slug pues en el createDto lo hace a partir del title, pero en el update no o no necesariamente depende de la lógica del negocio -> la verdad es más fácil hacerlo imperativo que usar decorador, me ahorro tiempo, no lo reutilizaré xd hay que mejorar esa lógica: solo debe poder ingresarse el title, el slug no ni para create ni update, así hacemos que si el title es único, el slug también sea único, darle ese poder al user es caótico xd
// el arreglo vacío no es igual al null de nullable
// Paso 1: Crear el decorador personalizado con class-validator
// Paso 2: Uso del decorador personalizado
// @NotContainsAny([' ', '/', '|', '\\'], { message: 'Contains forbidden characters' }) ez revisa los dtos para ver los decoradores de validación y transformación
// synchronize peligroso en prod xd es como el prisma migrate dev cuando haya cambios en las relaciones o tablas, autoLoadEntities para usar las entities sin exportar como en nest docs

// TODOs
// más adelante estaría bacán hacer in findOne por term tipo slug o title o uuid, lo mismo para update
// borrar el slug nomás xd usar su formato sobre el title, ahorro de columnas en sql es mejor rendimiento y parte de una de las normalizaciones no sé si 1era o 2da o 3era xd

// resumen cap10
// nest new teslo ; cd teslo
// rm -rf .git
// remove app .controller .service .spec
// ngrok http 3000 y postman para probar
// set global prefix
// set http folder and crud request in postman
// crear docker-compose.yaml, levantar con docker compose up -d, actualizar imagen de postgres y bajarme el postgres localmente instalado tmr
// .gitignore .env y postgres volume
// crear .env y .env template, llenarlos
// instalar nest module para env vars, probar conexión sin env vars solo hardcodeado, instalar pnpm i pg o mysql2 o el driver que diga el error
// usar env vars para conectarse a db, validar conexión con datagrid ez
// crear entity de products
// crear el createDto, habilitar los global pipes
// importar el product.entity en el product.module y usarlo en el product.service
// corregir errores con handleExceptions y el beforeInsert
// terminar el crud con paginated.dto y beforeUpdate
// ez crud con postgresql
