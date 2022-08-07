import SerializableDocument from '../serializable-document';
import { SerializationOptions } from '../serializable-document.factory';
import { SerializedType } from '../types';

export type JsonType = Record<string, any>;

export class JSONDocument extends SerializableDocument<JsonType> {
  constructor(
    protected readonly document: JsonType | SerializedType,
    protected readonly contentType: string,
    protected readonly options?: SerializationOptions,
  ) {
    super(document, contentType, options);
  }

  async serialize(): Promise<SerializedType> {
    if (this.options?.skipSerialization) {
      return this.document as SerializedType;
    }

    this.serializedDocument = JSON.stringify(this.document);
    return this.serializedDocument;
  }

  async deserialize(): Promise<JsonType> {
    return JSON.parse(this.serializedDocument);
  }
}
