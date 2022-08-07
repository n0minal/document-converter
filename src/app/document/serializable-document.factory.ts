import { BadRequestException } from '@nestjs/common';
import { providers } from './providers';
import { SerializationOptions } from './serialization-options';
import { SerializableType } from './types';

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
  const provider = providers[contentType];

  if (!provider)
    throw new BadRequestException(`Content type ${contentType} is not supported as a source`);

  const serializableDocument = provider(document, contentType, options);
  serializableDocument.serialize();
  return serializableDocument;
};
