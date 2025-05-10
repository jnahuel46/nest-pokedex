# POKEDEX

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Stack Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **MongoDB**: A NoSQL database used for storing Pokémon data.
- **ConfigModule**: For environment variable management.
- **MongoDB Compass**: GUI for MongoDB database management and visualization.
- **Railway**: Cloud platform for application deployment and hosting.

## Deployment

The application is deployed on Railway, a modern cloud platform that provides:
- Automatic deployments from Git
- Built-in CI/CD pipeline
- Environment variable management
- MongoDB database hosting
- SSL/TLS encryption
- Custom domain support

### Production Environment
- **API URL**: https://nest-pokedex-production-b874.up.railway.app
- **API Documentation**: https://nest-pokedex-production-b874.up.railway.app/api/docs
- **Database**: MongoDB Atlas (managed through Railway)
- **Environment**: Production with optimized settings

### Database Management
MongoDB Compass is used for database management, providing:
- Real-time database monitoring
- CRUD operations through GUI
- Query performance analysis
- Index management
- Data visualization
- Schema validation

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
MONGODB=mongodb://localhost:27017/nest-pokemon
PORT=3000
POKEAPI=https://pokeapi.co/api/v2/pokemon?limit=440
```

## Setup and Running Instructions

1. Install dependencies:
```bash
$ pnpm install
```

2. Create the `.env` file as shown above

3. Start MongoDB using Docker Compose:
```bash
$ docker-compose up -d
```

4. Start the development server:
```bash
$ pnpm start:dev
```

5. (Optional) Connect to MongoDB Compass:
   - Open MongoDB Compass
   - Use connection string: `mongodb://localhost:27017`
   - Select database: `nest-pokemon`

6. (Optional) Populate the database with Pokémon data:
```bash
$ pnpm start:dev -- --seed
```

The application will be available at `http://localhost:3000/api/v2`

## Development Tools

### MongoDB Compass Features Used
- **Data Explorer**: For direct database manipulation
- **Performance Advisor**: To optimize query performance
- **Schema Analysis**: For data structure validation
- **Index Management**: To maintain optimal query performance
- **Real-time Monitoring**: For database health checks

### Railway Deployment Features
- **Automatic Deployments**: Triggered by Git pushes
- **Environment Variables**: Securely managed through Railway dashboard
- **Log Management**: Real-time application logs
- **Metrics**: Application performance monitoring
- **Database Backups**: Automated MongoDB backups

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

### Seed Endpoint

- `GET /seed` - Populate the database with Pokémon data from PokeAPI
  - Uses the HTTP adapter to fetch data
  - Inserts 440 Pokémon records

## Features

### Custom Pipes
- `ParseMongoIdPipe`: Validates if the provided ID is a valid MongoDB ObjectId

### Adapters
- `FetchAdapter`: Custom HTTP adapter implementing the `HttpAdapter` interface
  - Provides a generic `get<T>` method for type-safe HTTP requests
  - Used for fetching data from external APIs (PokeAPI)
  - Handles error cases and response parsing

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
- **CommonModule**: Contains shared functionality, custom pipes, and the HTTP adapter.
- **SeedModule**: Handles database seeding with Pokémon data from PokeAPI.

## Technical Implementation Details

### Database Architecture
- MongoDB Atlas for production
- Local MongoDB for development
- Indexed fields for optimized queries
- Schema validation for data integrity

### Security Measures
- Environment variables for sensitive data
- MongoDB authentication
- SSL/TLS encryption
- Input validation through DTOs
- Rate limiting (if implemented)

### Performance Optimizations
- Database indexing on frequently queried fields
- Pagination for large data sets
- Caching strategies (if implemented)
- Query optimization through MongoDB Compass analysis

## API Documentation

The API documentation is available through Swagger UI at:
- Development: `http://localhost:3000/api/docs`
- Production: `https://nest-pokedex-production-b874.up.railway.app/api/docs`

### Documentation Features
- Interactive API documentation
- Try-it-out functionality
- Request/Response examples
- Schema validation
- Authentication support
- Detailed endpoint descriptions
- Response codes and descriptions

### Documentation Sections
- **Pokemon Endpoints**: All CRUD operations for Pokemon management
- **Seed Endpoint**: Database population endpoint
- **Models**: Data transfer objects (DTOs) and their schemas
- **Authentication**: (If implemented) Authentication methods and requirements

## Bonus: Docker Production Deployment

### Prerequisites
- Docker and Docker Compose installed
- `.env.prod` file with production environment variables
- `docker-compose.prod.yaml` file

### Production Environment Variables
Create a `.env.prod` file with your production variables:
```env
MONGODB=mongodb://your-production-mongodb-url
PORT=3000
POKEAPI=https://pokeapi.co/api/v2/pokemon?limit=440
```

### Docker Production Commands

#### Build and Run
To build and start the production containers:
```bash
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

#### Run Only
To start the production containers (if already built):
```bash
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up
```

### Production Features
- Multi-stage Docker build for optimized image size
- Production-ready environment configuration
- Secure environment variable handling
- Optimized for production performance
- Uses pnpm for dependency management
