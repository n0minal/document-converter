import { IsIn, IsOptional, IsString } from 'class-validator';
import { AllowedContentTypes } from '../../constants/allowed-content-types';

export class ConversionDto {
  @IsString()
  @IsIn(Object.keys(AllowedContentTypes))
  targetFormat: string;

  @IsOptional()
  @IsString()
  segmentDelimiter: string;

  @IsOptional()
  @IsString()
  elementDelimiter: string;
}
