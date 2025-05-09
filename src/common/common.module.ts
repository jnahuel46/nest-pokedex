import { Module } from '@nestjs/common';
import { FetchAdapter } from './adapters/axios.adapter';

@Module({
  providers: [FetchAdapter],
  exports: [FetchAdapter],
})
export class CommonModule {}
