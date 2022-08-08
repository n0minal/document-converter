import { IsIn, IsOptional, IsString } from 'class-validator';
import { SerializationOptions } from 'src/app/document/serialization-options';
import { AllowedContentTypes } from '../../../constants/allowed-content-types';

export class ConversionDto implements SerializationOptions {
  @IsString()
  @IsIn(Object.keys(AllowedContentTypes))
  targetFormat: string;

  @IsOptional()
  @IsString()
  segmentDelimiter: string;

  @IsOptional()
  @IsString()
  elementDelimiter: string;

  @IsOptional()
  @IsString()
  parentRootElement: string;
}
