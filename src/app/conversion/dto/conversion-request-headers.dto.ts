import { Expose } from 'class-transformer';
import { IsIn, IsString } from 'class-validator';
import { AllowedContentTypes } from '../../../constants/allowed-content-types';

export class ConversionRequestHeadersDto {
  @IsString()
  @IsIn(Object.values(AllowedContentTypes))
  @Expose({ name: 'content-type' })
  public readonly 'content-type': string;
}
