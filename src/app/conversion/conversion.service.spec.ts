import { Test, TestingModule } from '@nestjs/testing';
import { ConversionService } from './conversion.service';
import { createSerializableDocument } from '../document/serializable-document.factory';
import { simpleDocument } from '../document/json/__mocks__';
import { simpleDocument as simpleXmlDocument } from '../document/xml/__mocks__';
import { NotFoundException } from '@nestjs/common';

jest.mock('../document/serializable-document.factory');

describe('ConversionService', () => {
  let service: ConversionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConversionService],
    }).compile();

    service = module.get<ConversionService>(ConversionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call the serializable document factory with correct params', async () => {
    const serialize = jest.fn();
    const deserialize = jest.fn(() => simpleXmlDocument.xml);

    (createSerializableDocument as jest.Mock).mockImplementation(() => ({
      serialize,
      deserialize,
    }));

    const result = await service.convert(
      simpleDocument.json,
      'application/json',
      'xml',
      '~',
      '*',
      undefined,
    );

    expect(serialize).toHaveBeenCalledTimes(1);
    expect(deserialize).toHaveBeenCalledTimes(1);
    expect(result).toBe(simpleXmlDocument.xml);
  });

  it('should throw a not found exception when an invalid targetFormat is given', async () => {
    expect(
      service.convert(simpleXmlDocument.xml, 'application/xml', 'xlsx', '~', '*', undefined),
    ).rejects.toThrow(NotFoundException);
  });
});
