import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
main();

// cap3 apuntes o errores o TODOs
// error: git add .
// error: 'apps/nest_cars_100/' no tiene un commit checked out
// fatal: falló al agregar archivos -> hay que hace un git submodule init en el root y git status en los submodules, eso se verá en microservicios, por ahora solo movernos con cd a apps/nest... y meterle un rm -rf .git, eso borra la carpeta oculta git y listo, no hay más problemas con conventional commits, validar con un ls -la y ctrl shift p reload window
// en el video final del nest cap3 done no olvidar mencionar al @param y @body y los params en al ruta -> providar != services de paso
