import { BadRequestException } from '@nestjs/common';
import { AllowedContentTypes } from '../../constants/allowed-content-types';
import { JSONDocument, JsonType } from './json';
import { SerializableType } from './types';
import { EdiX12Document, EdiX12Type } from './x12';
import { XMLDocument, XmlType } from './xml';

export interface SerializationOptions {
  segmentDelimiter?: string;
  elementDelimiter?: string;
  skipSerialization?: boolean;
}

/**
 * @about A Convertible document factory based on the content type.
 * @param document
 * @param contentType
 * @param segmentDelimiter
 * @param elementDelimiter
 * @returns {ConvertibleDocument} - A ConvertibleDocument instance.
 */
export const createSerializableDocument = (
  document: SerializableType | string,
  contentType: string,
  options?: SerializationOptions,
) => {
  const providers = {
    [AllowedContentTypes.x12]: () => {
      const { segmentDelimiter, elementDelimiter } = options || {};

      if (!segmentDelimiter || !elementDelimiter)
        throw new BadRequestException(
          'Parameters segmentDelimiter and elementDelimiter are required for this document type',
        );

      return new EdiX12Document(document as EdiX12Type, contentType, options);
    },
    [AllowedContentTypes.xml]: () => {
      return new XMLDocument(document as XmlType, contentType, options);
    },
    [AllowedContentTypes.json]: () => {
      return new JSONDocument(document as JsonType, contentType, options);
    },
  };

  const provider = providers[contentType];

  if (!provider)
    throw new BadRequestException(`Content type ${contentType} is not supported as a source`);

  const serializableDocument = provider();
  serializableDocument.serialize();
  return serializableDocument;
};
