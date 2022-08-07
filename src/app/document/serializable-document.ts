import { SerializationOptions } from './serialization-options';
import { SerializedType } from './types';

export default abstract class SerializableDocument<T> {
  protected serializedDocument: SerializedType;

  constructor(
    protected readonly document: T | SerializedType,
    protected readonly contentType: string,
    protected readonly options?: SerializationOptions,
  ) {
    if (options?.skipSerialization) {
      this.serializedDocument = document as SerializedType;
    }
  }

  abstract serialize(): Promise<SerializedType>;
  abstract deserialize(): Promise<T>;
}
