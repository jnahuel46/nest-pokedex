import { IsString, IsInt, IsPositive, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePokemonDto {
  @ApiProperty({
    description: 'The name of the pokemon',
    example: 'Pikachu',
    minLength: 1,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The pokemon number in the pokedex',
    example: 25,
    minimum: 1,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  no: number;
}
