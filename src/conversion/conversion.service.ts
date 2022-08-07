import { Injectable } from '@nestjs/common';

@Injectable()
export class ConversionService {
  convert(
    document: any,
    contentType: string,
    targetFormat: string,
    segmentDelimiter?: string,
    elementDelimiter?: string,
  ) {
    return {
      document,
      contentType,
      targetFormat,
      segmentDelimiter,
      elementDelimiter,
    };
  }
}
