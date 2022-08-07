import { Body, Controller, Post, Query } from '@nestjs/common';
import { RequestHeader } from '../../decorators/RequestHeader';
import { ConversionService } from './conversion.service';
import { ConversionRequestHeadersDto } from './dto/conversion-request-headers.dto';
import { ConversionDto } from './dto/conversion.dto';

@Controller('conversion')
export class ConversionController {
  constructor(private readonly conversionService: ConversionService) {}

  @Post()
  async convert(
    @Query() { targetFormat, segmentDelimiter, elementDelimiter }: ConversionDto,
    @Body() document: any,
    @RequestHeader(ConversionRequestHeadersDto)
    headers: ConversionRequestHeadersDto,
  ) {
    const contentType = headers['content-type'];

    return this.conversionService.convert(
      document,
      contentType,
      targetFormat,
      segmentDelimiter,
      elementDelimiter,
    );
  }
}
