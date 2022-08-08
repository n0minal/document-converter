import { XMLDocument } from '.';
import { simpleDocument } from './__mocks__';

describe('XML Document Conversion Test Suite', () => {
  it('should serialize a simple XML document', async () => {
    const { xml, serialized, parentRootElement } = simpleDocument;

    const document = new XMLDocument(xml, 'application/xml', { parentRootElement });

    const result = await document.serialize();
    expect(result).toBe(serialized);
  });

  it('should deserialize a simple XML document', async () => {
    const { xml, serialized, parentRootElement } = simpleDocument;

    const document = new XMLDocument(serialized, 'application/xml', {
      skipSerialization: true,
      parentRootElement,
    });

    const result = await document.deserialize();
    expect(result).toEqual(xml);
  });
});
