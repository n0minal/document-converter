import ConvertibleDocument from '../convertible-document';

type EdiX12Type = string;

export class EdiX12Document extends ConvertibleDocument<EdiX12Type> {
  constructor(
    protected readonly document: EdiX12Type,
    protected readonly contentType: string,
    protected readonly segmentDelimiter: string,
    protected readonly elementDelimiter: string,
  ) {
    super(document, contentType);
  }

  /**
   * @about Converts an X12 document into a serialized JSON string.
   * @returns A promise that resolves to a serialized JSON string.
   */
  async serialize(): Promise<string> {
    const json = {};
    const segments = this.document.split(this.segmentDelimiter);

    segments.forEach((segment: string) => {
      const elements: string[] = segment.split(this.elementDelimiter);
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

    return JSON.stringify(json);
  }
}
