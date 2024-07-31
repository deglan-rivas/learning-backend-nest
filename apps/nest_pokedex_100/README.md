<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Ejecutar en desarrollo

1. Clonar el monorepo
```
git clone https://github.com/deglan-rivas/learning-backend-nest
```
2. Moverse al folder apps/nest_pokedex_100
```
cd apps/nest_pokedex_100
```
3. Instalar dependencias
```
pnpm install
```
4. Instalar el cli de nest
```
pnpm i -g @nestjs/cli
```
5. Levantar la base de datos mongodb
```
docker compose up -d
```
6. Levantar el servidor en desarrollo
```
pnpm start:dev
```
7. Reconstruir la base de datos utilizando el seed
```
http://localhost:3000/api/v2/seed
```

# Stack de tecnologías

* MongoDB
* Nestjs