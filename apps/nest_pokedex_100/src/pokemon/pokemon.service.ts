import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) { }

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    try {
      const pokemon = new this.pokemonModel(createPokemonDto);
      return await pokemon.save();
    } catch (error) {
      this.handleException(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string): Promise<Pokemon> {
    // this.pokemonModel.findOne({ no: id });
    // this.pokemonModel.findByIdAndUpdate

    if (!isNaN(+term)) {
      return await this.pokemonModel.findOne({ no: term });
    }

    if (isValidObjectId(term)) {
      return await this.pokemonModel.findById(term);
    }

    const pokemon = await this.pokemonModel.findOne({ name: term });
    if (!pokemon)
      throw new BadRequestException(
        `Pokemon with id, name or no "${term}" not found`,
      );

    return pokemon;
  }

  async update(
    term: string,
    updatePokemonDto: UpdatePokemonDto,
  ): Promise<Pokemon> {
    const pokemon = await this.findOne(term);

    try {
      await pokemon.updateOne(updatePokemonDto, { new: true });

      return {
        ...pokemon.toJSON(),
        ...updatePokemonDto,
      };
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string): Promise<void> {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`Pokemon with id ${id} not found`);
  }

  handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        'Pokemon already exists: ' + error.keyValue,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      "Can't create Pokemon - Check server logs",
    );
  }
}
