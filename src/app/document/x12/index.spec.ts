import { EdiX12Document } from '.';
import { simpleDocument, complexDocument } from './__mocks__';

describe('X12 Document Conversion Test Suite', () => {
  it('should serialize a simple EDI-X12 document', async () => {
    const { edi, segmentDelimiter, elementDelimiter, serialized } = simpleDocument;

    const document = new EdiX12Document(edi, 'application/edi-x12', {
      segmentDelimiter,
      elementDelimiter,
    });

    const result = await document.serialize();
    expect(result).toBe(serialized);
  });

  it('should serialize a complex EDI-X12 document', async () => {
    const { edi, segmentDelimiter, elementDelimiter, serialized } = complexDocument;

    const document = new EdiX12Document(edi, 'application/edi-x12', {
      segmentDelimiter,
      elementDelimiter,
    });

    const result = await document.serialize();
    expect(result).toBe(serialized);
  });

  it('should deserialize a simple EDI-X12 document', async () => {
    const { edi, segmentDelimiter, elementDelimiter, serialized } = simpleDocument;

    const document = new EdiX12Document(serialized, 'application/edi-x12', {
      segmentDelimiter,
      elementDelimiter,
      skipSerialization: true,
    });

    const result = await document.deserialize();
    expect(result).toEqual(edi);
  });

  it('should deserialize a complex EDI-X12 document', async () => {
    const { edi, segmentDelimiter, elementDelimiter, serialized } = complexDocument;

    const document = new EdiX12Document(serialized, 'application/edi-x12', {
      segmentDelimiter,
      elementDelimiter,
      skipSerialization: true,
    });

    const result = await document.deserialize();

    const expectedSegments = edi.split(segmentDelimiter).sort();
    const resultSegments = result.split(segmentDelimiter).sort();

    expect(expectedSegments).toEqual(resultSegments);
  });
});
