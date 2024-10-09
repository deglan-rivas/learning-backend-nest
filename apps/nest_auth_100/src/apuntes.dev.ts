// authorization and authentication

// sudo lsof -i :5432
// lsof -i :5433
// sudo kill -i :5433	-->	sudo systemctl stop postgresql
// docker logs teslodb
// sudo rm -r postgres/
// -> main .ts tiene prefi /api	-->	en Chrome hacer un get a localhost:3000/api/products
// -> si no hay nada, entonces hacer un get a localhost:3000/api/seed

// crear usuario
// nest g res auth --no-spec	-->	rest api, crud yes
// exportar e importar el typeorm y validarlo con datagrip ez
// agregar los prefijos de la ruta /api y luego /auth/register
// agregar middlewares validadores class-validator
// validar el save en la db postgres, inyectar repo de user

// guardar la contraseña hasheada en la db, no mostrar ni el password ni el auth ahí

// crear endpoint para el login, validar su dto, validar que esté correcto y devolver el login, solo traer las columnas que necesitamos
