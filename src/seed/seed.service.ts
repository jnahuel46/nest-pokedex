import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-interfaces.interface';
import { PokemonService } from '../pokemon/pokemon.service';
import { FetchAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly http: FetchAdapter,
  ) {}

  /**
   * Executes the seed process to populate the database with Pokémon data
   * This method:
   * 1. Clears existing Pokémon data
   * 2. Fetches Pokémon data from PokeAPI
   * 3. Transforms the data into the required format
   * 4. Inserts the data into the database
   */
  async executeSeed() {
    // Clear existing data
    await this.pokemonService.deleteMany();

    // Fetch Pokémon data from PokeAPI
    const response = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=440',
    );
    const data = response;

    // Transform the data into the required format
    const pokemonToInsert: { name: string; no: number }[] = [];
    data.results.forEach(({ name, url }) => {
      // Extract Pokémon number from URL
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      pokemonToInsert.push({ name, no });
    });

    // Insert all Pokémon into the database
    await this.pokemonService.insertMany(pokemonToInsert);
    return 'Seed executed';
  }
}
