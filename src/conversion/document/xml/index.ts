import { parseStringPromise, convertableToString as ConvertibleToString } from 'xml2js';
import ConvertibleDocument from '../convertible-document';

export type XmlType = ConvertibleToString;

export class XMLDocument extends ConvertibleDocument<XmlType> {
  constructor(protected readonly document: XmlType, protected readonly contentType: string) {
    super(document, contentType);
  }

  async serialize(): Promise<string> {
    return JSON.stringify(parseStringPromise(this.document));
  }
}
