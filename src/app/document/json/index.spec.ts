import { JSONDocument } from '.';
import { simpleDocument } from './__mocks__';

describe('JSON Document Conversion Test Suite', () => {
  it('should serialize a simple JSON document', async () => {
    const { json, serialized } = simpleDocument;

    const document = new JSONDocument(json, 'application/json');

    const result = await document.serialize();
    expect(result).toBe(serialized);
  });

  it('should deserialize a simple JSON document', async () => {
    const { json, serialized } = simpleDocument;

    const document = new JSONDocument(serialized, 'application/json', {
      skipSerialization: true,
    });

    const result = await document.deserialize();
    expect(result).toEqual(json);
  });
});
