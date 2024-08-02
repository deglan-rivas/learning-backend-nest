import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommonModule } from './common/common.module';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';
import { PokemonModule } from './pokemon/pokemon.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // isGlobal: true,
      // envFilePath: '.env',
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    PokemonModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      dbName: 'learning_nest_pokemon',
    }),
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {
  // constructor() {
  //   console.log(process.env.PORT);
  //   console.log(+process.env.PORT);
  //   console.log(typeof process.env.PORT);
  // }
}
