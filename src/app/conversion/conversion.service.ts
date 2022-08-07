import { Injectable } from '@nestjs/common';
import { getContentTypeFromDocumentType } from '../../app/util/helpers';
import { createSerializableDocument } from '../document/serializable-document.factory';
import { SerializableType } from '../document/types';

@Injectable()
export class ConversionService {
  async convert(
    document: SerializableType,
    contentType: string,
    targetFormat: string,
    segmentDelimiter?: string,
    elementDelimiter?: string,
  ) {
    const serializableDocument = createSerializableDocument(document, contentType, {
      segmentDelimiter,
      elementDelimiter,
    });

    const serializedData = await serializableDocument.serialize();

    const targetDocumentType = await getContentTypeFromDocumentType(targetFormat);

    const targetSerializableDocument = createSerializableDocument(
      serializedData,
      targetDocumentType,
      {
        segmentDelimiter,
        elementDelimiter,
        skipSerialization: true,
      },
    );

    const deserializedTargetData = await targetSerializableDocument.deserialize();

    return deserializedTargetData;
  }
}
