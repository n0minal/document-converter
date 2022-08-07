import SerializableDocument from '../serializable-document';
import { SerializationOptions } from '../serialization-options';

export type EdiX12Type = string;

export class EdiX12Document extends SerializableDocument<EdiX12Type> {
  serializedDocument: string;

  constructor(
    protected readonly document: EdiX12Type | string,
    protected readonly contentType: string,
    protected readonly options: SerializationOptions,
  ) {
    super(document, contentType, options);
  }

  /**
   * @about Converts an X12 document into a serialized JSON string.
   * @returns A promise that resolves to a serialized JSON string.
   */
  async serialize(): Promise<string> {
    const json = {};

    const { segmentDelimiter, elementDelimiter } = this.options || {};

    const segments = this.document.split(segmentDelimiter);

    segments.forEach((segment: string) => {
      const elements: string[] = segment.split(elementDelimiter);
      const segmentName = elements[0];
      const segmentData = elements.slice(1);

      if (!segmentName) return;

      const baseIndex = json[segmentName] ? Object.keys(json[segmentName]).length + 1 : 1;

      const newElements = Object.fromEntries(
        segmentData.map((element, index) => {
          const elementName = `${segmentName}${baseIndex + index}`;
          return [elementName, element.trim()];
        }),
      );

      json[segmentName] = {
        ...json[segmentName],
        ...newElements,
      };
    });

    this.serializedDocument = JSON.stringify(json);
    return this.serializedDocument;
  }

  async deserialize(): Promise<EdiX12Type> {
    return '';
  }
}
