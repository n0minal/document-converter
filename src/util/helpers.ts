import { AllowedContentTypes } from '../constants/allowed-content-types';

export const getDocumentTypeFromContentType = (contentType: string) => {
  const document = Object.entries(AllowedContentTypes).find(
    ([_, value]) => value === contentType,
  );

  return document[0];
};
