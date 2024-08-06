import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({
  // imports: [AxiosAdapter],
  providers: [AxiosAdapter],
  exports: [AxiosAdapter],
})
export class CommonModule { }
