import { EdiX12Document } from '.';
import { simpleDocument, complexDocument } from './__mocks__';

describe('X12 Document Conversion Test Suite', () => {
  it('should return a valid json string when standardizing a valid EDI-X12', async () => {
    const { edi, segmentDelimiter, elementDelimiter, serialized } = simpleDocument;

    const document = new EdiX12Document(
      edi,
      'application/edi-x12',
      segmentDelimiter,
      elementDelimiter,
    );

    const result = await document.serialize();
    expect(result).toBe(serialized);
  });

  it('should concatenate elements from a valid EDI-X12 with repeated segments', async () => {
    const { edi, segmentDelimiter, elementDelimiter, serialized } = complexDocument;

    const document = new EdiX12Document(
      edi,
      'application/edi-x12',
      segmentDelimiter,
      elementDelimiter,
    );

    const result = await document.serialize();
    expect(result).toBe(serialized);
  });
});
