<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Running the app
1. Clone repository
```
git clone https://github.com/deglan-rivas/learning-backend-nest ; cd apps/nest_teslo_100
```
2. Create and fill __.env__ from __.env.template__
3. Install dependencies
```
pnpm install
```
3. Run containers
```
pnpm start dev
```
4. Run development server
```
docker compose up -d
```
5. Populate db using /seed route
```
curl http://localhost:3000/api/v2/seed
```