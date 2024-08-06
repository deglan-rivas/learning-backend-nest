import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  private readonly port: number;
  private readonly mongodb_uri: string;
  private readonly limit: number;
  private readonly skip: number;

  constructor(
    @InjectModel(Pokemon.name)
    private pokemonModel: Model<Pokemon>,
    // private readonly http: AxiosAdapter,
    private readonly configService: ConfigService,
  ) {
    this.port = this.configService.getOrThrow<number>('PORT');
    this.mongodb_uri = this.configService.getOrThrow<string>('MONGODB_URI');
    this.limit = this.configService.getOrThrow<number>('LIMIT');
    this.skip = this.configService.getOrThrow<number>('SKIP');
  }

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    try {
      const pokemon = new this.pokemonModel(createPokemonDto);
      return await pokemon.save();
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<Pokemon[]> {
    console.log(this.port, typeof this.port);
    console.log(this.mongodb_uri, typeof this.mongodb_uri);
    console.log(this.limit, typeof this.limit);
    console.log(this.skip, typeof this.skip);

    const { limit = this.limit, skip = this.skip } = paginationDto;
    return await this.pokemonModel
      .find()
      .limit(limit)
      .skip(skip)
      .sort({
        no: 1,
      })
      .select('-__v');
  }

  async findOne(id: string): Promise<Pokemon> {
    const pokemon = await this.pokemonModel.findById(id);
    if (!pokemon)
      throw new NotFoundException(`Pokemon with id ${id} not found`);
    return pokemon;
  }

  async update(
    id: string,
    updatePokemonDto: UpdatePokemonDto,
  ): Promise<Pokemon> {
    let response;
    try {
      response = await this.pokemonModel.findByIdAndUpdate(
        id,
        updatePokemonDto,
        {
          new: true,
        },
      );
    } catch (error) {
      this.handleExceptions(error);
    }

    if (!response)
      throw new NotFoundException(`Pokemon with id ${id} not found`);

    return response;
  }

  async remove(id: string): Promise<void> {
    const response = await this.pokemonModel.findByIdAndDelete(id);
    if (!response)
      throw new NotFoundException(`Pokemon with id ${id} not found`);
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon exists in db: ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(` ${error} `);
  }
}
