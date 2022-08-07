import { Injectable, NestMiddleware } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { AllowedContentTypes } from '../constants/allowed-content-types';

@Injectable()
export class BodyParserMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const parser = bodyParser.text({
      type: Object.values(AllowedContentTypes),
    });
    parser(req, res, next);
  }
}
