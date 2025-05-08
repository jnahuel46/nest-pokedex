# POKEDEX

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Stack Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **MongoDB**: A NoSQL database used for storing Pokémon data.

## Running the Project with Docker Compose

To run the project using Docker Compose, ensure you have Docker and Docker Compose installed on your machine. Then, execute the following command:

```bash
$ docker-compose up
```

This will start the MongoDB service defined in the `docker-compose.yml` file.

## API Endpoints

All endpoints are prefixed with `/api/v2`

### Pokemon Endpoints

- `POST /pokemon` - Create a new Pokémon
  - Body: `{ name: string, no: number }`
  - Validates: name (string, not empty), no (positive integer)

- `GET /pokemon` - Get all Pokémon

- `GET /pokemon/:id` - Get a Pokémon by ID
  - Can find by: MongoDB ID, Pokémon number, or name

- `PATCH /pokemon/:id` - Update a Pokémon
  - Body: Partial `{ name?: string, no?: number }`

- `DELETE /pokemon/:id` - Delete a Pokémon
  - Validates MongoDB ID using custom pipe

## Features

### Custom Pipes
- `ParseMongoIdPipe`: Validates if the provided ID is a valid MongoDB ObjectId

### Global Configuration
- Global prefix: `/api/v2`
- Global validation pipe with:
  - Whitelist enabled (strips non-whitelisted properties)
  - Forbid non-whitelisted properties

### Data Validation
- DTOs with class-validator decorators
- Automatic validation of request bodies
- Custom error handling for duplicate entries

## Current Modules

The project currently includes the following modules:

- **AppModule**: The root module of the application.
- **PokemonModule**: Handles operations related to Pokémon, including controllers and services for managing Pokémon data.
- **CommonModule**: Contains shared functionality and custom pipes.
