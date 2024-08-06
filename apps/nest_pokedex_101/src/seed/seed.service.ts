import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokemonResponse } from './interfaces/pokemon-response.interface';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ) { }

  async populateDB(): Promise<string> {
    await this.pokemonModel.deleteMany();

    const pokemons = await this.http.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=500&offset=0',
    );
    // console.log(pokemons.results);
    const pokemonsToDB: Pokemon[] = pokemons.results.map(({ name, url }) => {
      const no = url.split('/');
      return { name, no: +no[no.length - 2] };
    });

    await this.pokemonModel.insertMany(pokemonsToDB);
    return 'Seed executed successfully';
  }
}
