import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @ApiOperation({ summary: 'Create a new pokemon' })
  @ApiResponse({ status: 201, description: 'The pokemon has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @ApiOperation({ summary: 'Get all pokemons' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Number of items to skip' })
  @ApiResponse({ status: 200, description: 'Return all pokemons.' })
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.pokemonService.findAll(paginationDto);
  }

  @ApiOperation({ summary: 'Get a pokemon by id' })
  @ApiParam({ name: 'id', description: 'Pokemon ID, name or number' })
  @ApiResponse({ status: 200, description: 'Return the pokemon.' })
  @ApiResponse({ status: 404, description: 'Pokemon not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokemonService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a pokemon' })
  @ApiParam({ name: 'id', description: 'Pokemon ID' })
  @ApiResponse({ status: 200, description: 'The pokemon has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Pokemon not found.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(id, updatePokemonDto);
  }

  @ApiOperation({ summary: 'Delete a pokemon' })
  @ApiParam({ name: 'id', description: 'Pokemon ID' })
  @ApiResponse({ status: 200, description: 'The pokemon has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Pokemon not found.' })
  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
