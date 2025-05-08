import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-interfaces.interface';
@Injectable()
export class SeedService {
  executeSeed() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=650')
      .then((res) => res.json() as Promise<PokeResponse>)
      .then((json) => {
        json.results.forEach(({ name, url }) => {
          const segments = url.split('/');
          const no = +segments[segments.length - 2];
          console.log({ name, no });
        });
      });

    return 'Seed executed';
  }
}
