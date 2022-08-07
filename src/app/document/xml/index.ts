import { convertableToString as ConvertibleToString, parseStringPromise } from 'xml2js';
import { toXML } from 'jstoxml';
import SerializableDocument from '../serializable-document';
import { SerializationOptions } from '../serializable-document.factory';
import { SerializedType } from '../types';

export type XmlType = ConvertibleToString;

export class XMLDocument extends SerializableDocument<XmlType> {
  constructor(
    protected readonly document: XmlType | SerializedType,
    protected readonly contentType: string,
    protected readonly options?: SerializationOptions,
  ) {
    super(document, contentType, options);
  }

  async serialize(): Promise<SerializedType> {
    const data = await parseStringPromise(this.document);
    this.serializedDocument = JSON.stringify(data);
    return this.serializedDocument;
  }

  async deserialize(): Promise<XmlType> {
    const raw = JSON.parse(this.serializedDocument as SerializedType);
    return toXML(raw, { indent: '  ', header: true, _selfCloseTag: false });
  }
}
