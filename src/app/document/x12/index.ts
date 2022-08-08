import SerializableDocument from '../serializable-document';
import { SerializationOptions } from '../serialization-options';
import { SerializedType } from '../types';

export type EdiX12Type = string;

export class EdiX12Document extends SerializableDocument<EdiX12Type> {
  serializedDocument: string;

  constructor(
    protected readonly document: EdiX12Type | SerializedType,
    protected readonly contentType: string,
    protected readonly options: SerializationOptions,
  ) {
    super(document, contentType, options);
  }

  /**
   * @about Converts an X12 document into a serialized JSON string.
   * @returns A promise that resolves to a serialized JSON string.
   */
  async serialize(): Promise<SerializedType> {
    if (this.options?.skipSerialization) {
      return this.document as SerializedType;
    }

    const json = {};

    const { segmentDelimiter, elementDelimiter } = this.options || {};

    const segments = this.document.split(segmentDelimiter);

    segments.forEach((segment: string) => {
      const elements: string[] = segment.split(elementDelimiter);
      const segmentName = elements[0];
      const segmentData = elements.slice(1);

      if (!segmentName) return;

      const newElements = Object.fromEntries(
        segmentData.map((element, index) => {
          const elementName = `${segmentName}${index + 1}`;
          return [elementName, element];
        }),
      );

      // Repeated segments will be converted into an array of objects.
      if (json[segmentName]) {
        const elements = Array.isArray(json[segmentName])
          ? [...json[segmentName]]
          : [{ ...json[segmentName] }];

        elements.push(newElements);
        json[segmentName] = [...elements];
      } else {
        json[segmentName] = {
          ...json[segmentName],
          ...newElements,
        };
      }
    });

    this.serializedDocument = JSON.stringify(json);
    return this.serializedDocument;
  }

  /**
   * @about Converts a serialized JSON string into an X12 document.
   */
  async deserialize(): Promise<EdiX12Type> {
    let result = '';

    const raw = JSON.parse(this.serializedDocument);
    const { elementDelimiter, segmentDelimiter } = this.options || {};

    Object.entries(raw).forEach(([segmentName, segmentData]) => {
      const elements = [];

      Object.values(segmentData).forEach((entry) => {
        if (typeof entry === 'object') {
          const nestedElements = Object.values(entry);
          const segment = this.buildSegment(
            segmentName,
            elementDelimiter,
            nestedElements,
            segmentDelimiter,
          );

          result += segment;
        } else {
          elements.push(entry);
        }
      });

      if (elements.length) {
        const segment = this.buildSegment(
          segmentName,
          elementDelimiter,
          elements,
          segmentDelimiter,
        );

        result += segment;
      }
    });

    return result;
  }

  buildSegment(segmentName, elementDelimiter, elements, segmentDelimiter) {
    return `${segmentName}${elementDelimiter}${elements.join(elementDelimiter)}${segmentDelimiter}`;
  }
}
