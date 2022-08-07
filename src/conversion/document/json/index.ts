import ConvertibleDocument from '../convertible-document';

export type JsonType = Record<string, any>;

export class JSONDocument extends ConvertibleDocument<JsonType> {
  constructor(protected readonly document: JsonType, protected readonly contentType: string) {
    super(document, contentType);
  }

  async serialize(): Promise<string> {
    return JSON.stringify(this.document);
  }
}
