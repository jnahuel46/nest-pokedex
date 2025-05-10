import { Module } from '@nestjs/common';
import { FetchAdapter } from './adapters/axios.adapter';
import { ConfigService } from '@nestjs/config';
@Module({
  providers: [FetchAdapter, ConfigService],
  exports: [FetchAdapter, ConfigService],
})
export class CommonModule {}
