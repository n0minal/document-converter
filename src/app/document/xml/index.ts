import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import SerializableDocument from '../serializable-document';
import { SerializationOptions } from '../serialization-options';
import { SerializedType } from '../types';

export type XmlType = string;

export class XMLDocument extends SerializableDocument<XmlType> {
  constructor(
    protected readonly document: XmlType | SerializedType,
    protected readonly contentType: string,
    protected readonly options?: SerializationOptions,
  ) {
    super(document, contentType, options);
  }

  async serialize(): Promise<SerializedType> {
    const { skipSerialization, parentRootElement } = this.options || {};

    if (skipSerialization) {
      return this.document as SerializedType;
    }

    const parser = new XMLParser({});
    const data = parser.parse(this.document);
    this.serializedDocument = JSON.stringify(parentRootElement ? data[parentRootElement] : data);
    return this.serializedDocument;
  }

  async deserialize(): Promise<XmlType> {
    const { parentRootElement } = this.options || {};
    const raw = JSON.parse(this.serializedDocument as SerializedType);
    const builder = new XMLBuilder({ format: false });
    let xml = '<?xml version="1.0" encoding="UTF-8" ?>';
    xml += builder.build(parentRootElement ? { [parentRootElement]: raw } : raw);
    return xml;
  }
}
