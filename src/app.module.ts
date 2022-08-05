import { Module } from '@nestjs/common';
import { ConversionModule } from './conversion/conversion.module';

@Module({
  imports: [ConversionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
