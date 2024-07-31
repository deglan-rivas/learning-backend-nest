import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokemonResponse } from './interfaces/pokemon-response.interface';

@Injectable()
export class SeedService {
  constructor(
    // @Injectable()
    private readonly http: AxiosAdapter,

    @InjectModel('Pokemon')
    private readonly pokemonModel: Model<Pokemon>,
  ) { }

  // async executeSeed(): Promise<Result[]> {
  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=4',
    );
    // console.log(data.results);

    // 1 sola invocación a la db usando método de mongoose: buen backend, buena db
    const pokemonsToInsert: { name: string; no: number }[] = data.results.map(
      ({ name, url }) => {
        const no = url.split('/');
        return { name, no: +no[no.length - 2] };
      },
    );

    await this.pokemonModel.insertMany(pokemonsToInsert);

    // >1 invocaciones a la db, pero usando promise all: buen backend, rip db
    // const pokemonsToInsert: Promise<{ name: string; no: number }>[] =
    //   data.results.map(({ name, url }) => {
    //     const no = url.split('/');
    //     const pokemon = { name, no: +no[no.length - 2] };
    //     return this.pokemonModel.create(pokemon);
    //   });

    // // console.log(pokemonsToInsert);
    // await Promise.all(pokemonsToInsert);

    // return { ...data };
    // return data.results;
    // return this.pokemonModel.insertMany(pokemonsToInsert);
    return `Seed executed `;
  }
}
