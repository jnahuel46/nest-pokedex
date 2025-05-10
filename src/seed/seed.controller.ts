import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @ApiOperation({ summary: 'Populate the database with pokemon data' })
  @ApiResponse({ status: 200, description: 'Database has been successfully populated.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get()
  executeSeed() {
    return this.seedService.executeSeed();
  }
}
