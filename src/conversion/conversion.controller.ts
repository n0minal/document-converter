import { Body, Controller, Post, Query } from '@nestjs/common';
import { RequestHeader } from 'src/decorators/RequestHeader';
import { ConversionRequestHeadersDto } from './dto/conversion-request-headers.dto';
import { ConversionDto } from './dto/conversion.dto';

@Controller('conversion')
export class ConversionController {
  @Post()
  async convert(
    @Query() conversionDto: ConversionDto,
    @Body() document: any,
    @RequestHeader(ConversionRequestHeadersDto)
    headers: ConversionRequestHeadersDto,
  ) {
    const contentType = headers['content-type'];
    return { contentType, document };
  }
}
