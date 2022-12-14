import { BadRequestException } from '@nestjs/common';
import { AllowedContentTypes } from '../../constants/allowed-content-types';
import { JSONDocument, JsonType } from './json';
import { EdiX12Document, EdiX12Type } from './x12';
import { XMLDocument, XmlType } from './xml';

export const providers = {
  [AllowedContentTypes.x12]: (document, contentType, options) => {
    const { segmentDelimiter, elementDelimiter } = options || {};

    if (!segmentDelimiter || !elementDelimiter)
      throw new BadRequestException(
        'Parameters segmentDelimiter and elementDelimiter are required for this document type',
      );

    return new EdiX12Document(document as EdiX12Type, contentType, options);
  },
  [AllowedContentTypes.xml]: (document, contentType, options) => {
    return new XMLDocument(document as XmlType, contentType, options);
  },
  [AllowedContentTypes.json]: (document, contentType, options) => {
    return new JSONDocument(document as JsonType, contentType, options);
  },
};
