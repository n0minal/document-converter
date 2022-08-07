import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConversionModule } from './conversion/conversion.module';
import { BodyParserMiddleware } from '../middlewares/body-parser.middleware';

@Module({
  imports: [ConversionModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BodyParserMiddleware).forRoutes('*');
  }
}
