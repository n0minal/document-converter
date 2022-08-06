import { IsIn, IsOptional, IsString } from 'class-validator';
import { AllowedContentTypes } from '../../constants/allowed-content-types';

export class ConversionDto {
  @IsString()
  @IsIn(Object.keys(AllowedContentTypes))
  targetFormat: string;

  @IsOptional()
  @IsString({ each: true })
  separators: string[];
}
