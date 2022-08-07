import { NotFoundException } from '@nestjs/common';
import { AllowedContentTypes } from '../../constants/allowed-content-types';

export const getDocumentTypeFromContentType = (contentType: string) => {
  const document = Object.entries(AllowedContentTypes).find(([_, value]) => value === contentType);

  if (!document) {
    throw new NotFoundException(`Content-type ${contentType} is not supported by the application`);
  }

  return document[0];
};

export const getContentTypeFromDocumentType = (documentType: string) => {
  const contentType = AllowedContentTypes[documentType];

  if (!contentType) {
    throw new NotFoundException(
      `Document type ${documentType} is not supported by the application`,
    );
  }

  return contentType;
};
