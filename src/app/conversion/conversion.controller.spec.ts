import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { simpleDocument } from '../document/x12/__mocks__';
import { ConversionController } from './conversion.controller';
import { ConversionService } from './conversion.service';

describe('ConversionController', () => {
  let controller: ConversionController;
  let service: ConversionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConversionController],
      providers: [ConversionService],
    }).compile();

    controller = module.get<ConversionController>(ConversionController);
    service = module.get<ConversionService>(ConversionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("should call conversionService's convert method with correct params", async () => {
    const convertSpy = jest.spyOn(service, 'convert');

    const { edi } = simpleDocument;

    await controller.convert(
      {
        targetFormat: 'json',
        segmentDelimiter: '~',
        elementDelimiter: '*',
        parentRootElement: undefined,
      },
      edi,
      { 'content-type': 'application/edi-x12' },
    );

    expect(convertSpy).toHaveBeenCalledWith(
      edi,
      'application/edi-x12',
      'json',
      '~',
      '*',
      undefined,
    );
  });

  it('should throw a bad request exception when an unsupported content-type is sent', async () => {
    const { edi } = simpleDocument;

    expect(
      controller.convert(
        {
          targetFormat: 'json',
          segmentDelimiter: '~',
          elementDelimiter: '*',
          parentRootElement: undefined,
        },
        edi,
        { 'content-type': 'application/edifact' },
      ),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw a not found exception when an unsupported targetFormat is sent', async () => {
    const { edi } = simpleDocument;

    expect(
      controller.convert(
        {
          targetFormat: 'xlsx',
          segmentDelimiter: '~',
          elementDelimiter: '*',
          parentRootElement: undefined,
        },
        edi,
        { 'content-type': 'application/edi-x12' },
      ),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw a bad request exception when a conversion involves a x12 document but segment or element delimiters are not sent', async () => {
    const { edi } = simpleDocument;

    expect(
      controller.convert(
        {
          targetFormat: 'json',
          segmentDelimiter: undefined,
          elementDelimiter: '*',
          parentRootElement: undefined,
        },
        edi,
        { 'content-type': 'application/edi-x12' },
      ),
    ).rejects.toThrow(BadRequestException);

    expect(
      controller.convert(
        {
          targetFormat: 'json',
          segmentDelimiter: '~',
          elementDelimiter: undefined,
          parentRootElement: undefined,
        },
        edi,
        { 'content-type': 'application/edi-x12' },
      ),
    ).rejects.toThrow(BadRequestException);
  });
});
