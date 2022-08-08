import { XMLDocument } from '.';
import { simpleDocument } from './__mocks__';

describe('X12 Document Conversion Test Suite', () => {
  it('should serialize a simple XML document', async () => {
    const { xml, serialized } = simpleDocument;

    const document = new XMLDocument(xml, 'application/edi-x12', { parentRootElement: 'root' });

    const result = await document.serialize();
    expect(result).toBe(serialized);
  });

  it('should deserialize a simple XML document', async () => {
    const { xml, serialized } = simpleDocument;

    const document = new XMLDocument(serialized, 'application/edi-x12', {
      skipSerialization: true,
      parentRootElement: 'root',
    });

    const result = await document.deserialize();
    expect(result).toEqual(xml);
  });
});
