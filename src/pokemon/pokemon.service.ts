import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId } from 'mongoose';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const pokemon = await this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({
        no: 1,
      });
    return pokemon;
  }

  async findOne(id: string) {
    let pokemon: Pokemon;
    if (!isNaN(+id)) {
      pokemon = await this.pokemonModel.findOne({ no: id });
    }
    if (!pokemon && isValidObjectId(id)) {
      pokemon = await this.pokemonModel.findById(id);
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: id.toLowerCase() });
    }

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with id ${id} not found`);
    }
    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(id);
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    }
    try {
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new NotFoundException(`Pokemon with id ${id} not found`);
    }
    return { message: 'Pokemon deleted' };
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon exists in db ${JSON.stringify(error.keyPattern)}`,
      );
    }
    throw new InternalServerErrorException(
      `Can't create Pokemon - Check server logs`,
    );
  }

  async deleteMany() {
    await this.pokemonModel.deleteMany();
  }

  async insertMany(pokemonToInsert: { name: string; no: number }[]) {
    await this.pokemonModel.insertMany(pokemonToInsert);
  }
}
