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

// resumen cap11
// la idea es agregar una columna array para imágenes no contemplado desde el inicio, relaciones, transacciones y rollback ez, borrar viejas imágenes con update, usar ese endpoint del patch para actualizar imgs,
// crear la tabla, primero el entity, importarlo en el module, validarlo en datagrip, archivo de barrido
// onetomany y manytoone ez, cascade true para evitar datos huérfanos así borra en ambas tablas aunque lo mejor siempre es soft delete por si hay facturas con vieja data
// aceptar el images en el dto, crear el image dentro del product para que añada el id al tq, notar que las images deben ser instancias, usar el image repository, devolver las imágenes como viene y no con sus id's pues eso no debe saber el user,
// el post usa el array de images inicial para no mostrar los id's, el get o find usa un map para no mostrar los id's, el eager es el equivalente al populate de mongo, justo para eso usamos un orm en lugar de hacer left join xd, typeorm avisa que hay que usar leftjoin si hacemos un querybuilder para usar where es lata pero al menos está documentado y gpt nos puede hacer el bajo, agregar un getOnePlain para no romper la retrocompatibilidad así se respeta sOlid
// batch2
// query runner siempre que impactemos en más de una tabla para hacer transacciones, usar el datasource que tiene la configuración de nuestro ds en este caso postgres, también usar el trycatch para el rollback y reinsertar así sea la misma imagen cosa que cambia su id, si no hay images no insertar nada ez si hubeira más tablas sería más if's csmr xd pero el commit lo hace seguro y reciclar el findOnePlain cosa que golpeamos la db una vez más pero reciclamos el código y devolvemos el product actualizado ez
// eliminar imágenes en cascada se puede hacer usando un queryRunner o con el onDelete Cascade nomás ez checkear cómo hacer el queryBuilder que es un queryRunner personalizado para borrar todos los products e insertar nuestro seed, darle muchas validaciones tipo por auth o solo en prod o solo una vez o cosas así
// para el seed solo hay que usar el exports e imports ez, no olvidar activar el cascade true y crearle un método al productService para que borre todos los productos, ya con eso se podría validar en datagrip si se puede borrar un producto y eso borra las imágenes ez
// dado que el seed solo se debe ejecutar una sola vez, entonces es válido usar un forEach con un create que hará unos 100 golpes a la db, lo correcto sería hacer un insertMany como se hizo con mongoDB, pero habría que importar el TypeOrm, crear el repository y usar el insertMany y rip nomás xd, también notar que el shape del CreateDto es el mismo que el de la seedData, por eso ts no da error, si cambiamos una key o hacemos que sea optional con ?: o en sus values habilitamos undefined con | undefined daría error
// por último renombrar las tablas desde el entityez

// cap12
// batch1
// crear el nest g res files --no-spec, anidar un post product, interceptor con tipo y options de multer como dice nest docs, renombrar el uploadedFile y tiparlo multer ez
// crear el fileFilter, respetar su firme de null true o error false, lo que devuelve es el file o undefined así que validar con un !file,
// no guardarlo en fs, mejor en cloudinary luego de validarlo xD, se puede limitar el tamaño también, para guardarlo solo usar un diskStorage, multer ya viene con el core de nestjs, guardarlo en static/uploads pues el public es público xd, usar un .gitkeep porque git no trackea folders vacíos,
// usar un fileName muy similar a fileFilter para darle nombre único incluso si son la misma imagen y así no se chanquen xd usar uuid
// batch2 seed y auth

// TODO
// nest cloudinary, postman local

// batch2
// la idea es devolver el url del static/product luego de guardar la imagen con un POST, usamos un helper que luego se puede hacer global recibiendo el param de subcarpeta como product o user, por ahora solo hay product, usar el Res Response de express para devolver manualmente la respuesta, no olvidar agregarlo pues al declararlo ya le avisamos a nest que devolveremos la response manualmente, notar que usamos el static y el helper del service xd para el user no sepa de dónde viene la imagen ni cuál es la ruta, todo esto incluye el POST y GET xd
// para retornar el secureUrl no olvidar hacerlo usando env vars, crearlas, importarlas en el módulo files, actualizar el .env.template, también agregar el logger y un mensajito en el main o bootstrap .ts ya que estamos usando el port del .env -> queda pendiente agregar joi para validar o agregarle un | localhost:${port}
// se puede desplegar en el public y actualizar la ruta agregando el host con el seed, pero me gusta más el static por el control que da usando jwt

// cap13
// auth es que tenga una llave o token, auto es que además de la llave tenga permiso para ver ese contenido,

// testo_101
// aprendidos
// siempre validar las importaciones, había traído un paginationDto de nest_pokedex_101 y por eso al no definir un rootDir en el tsconfig del nest_teslo_101, el compilador de ts subía de nivel hasta el apps que es el folder padre directo de ambos, por eso mostraba esas carpetas en el dist, bastó agregar el rootDir ./src, luego encontrar la importación equivocada, corregirla y correr denuevo el pnpm dev, este fue el error original:
// obtuve este error al ejecutar el comando "pnpm run dev" en nestjs:

// node:internal/modules/cjs/loader:1147
//   throw err;
//   ^

// Error: Cannot find module '/home/deglan/Escritorio/practicas_random/learning-backend-nest/apps/nest_teslo_101/dist/main'
//     at Module._resolveFilename (node:internal/modules/cjs/loader:1144:15)
//     at Module._load (node:internal/modules/cjs/loader:985:27)
//     at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:135:12)
//     at node:internal/main/run_main_module:28:49 {
//   code: 'MODULE_NOT_FOUND',
//   requireStack: []
// }

// Node.js v20.11.0
// ok, lo que pasa es que al ejecutar el comando "pnpm dev" el cual es el siguiente "dev": "nest start --watch", esto me genera el file dist/nest_teslo_101/src/main.js en lugar del file dist/main.js, por qué sucede esto?
// "rootDir": "./src",
// también me generaba un tsconfig.build.jsonbuild.json o algo así y otros nuevos files .map y .js en el pokedex, solo los borré fijándome qué files eran untracked o habían cambiado en el source control ez
// nest dev doesnt generate my dist/main en google xd
