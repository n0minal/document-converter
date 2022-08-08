# Description

A simple yet extensible document converter backend application made with Nest.js.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Adding support to a new document Type

To support a new document type there are few things you must do.

Let's say that we want to add support for CSV files for example:

1. Add your document type's content-type in `src/constants/allowed-content-types.ts`:

```ts
export const AllowedContentTypes = {
  x12: 'application/edi-x12',
  json: 'application/json',
  xml: 'application/xml',
  csv: 'text/csv', // New content type 🎆!
};
```
2. Create a folder called `csv` under the directory `src/app/document` and create a `index.ts` file inside of it:

```ts
import SerializableDocument from '../serializable-document';
import { SerializationOptions } from '../serialization-options';
import { SerializedType } from '../types';

export type CsvType = string;

export class CSVDocument extends SerializableDocument<CsvType> {
  constructor(
    protected readonly document: CsvType | SerializedType,
    protected readonly contentType: string,
    protected readonly options?: SerializationOptions,
  ) {
    super(document, contentType, options);
  }

  async serialize(): Promise<SerializedType> {
    if (this.options?.skipSerialization) {
      return this.document as SerializedType;
    }

    this.serializedDocument = <implement a csv to json serialization algorithm here>;
    return this.serializedDocument;
  }

  async deserialize(): Promise<JsonType> {
    const deserializedDocument = <implement a json to csv deserialization algorithm here>;
    return deserializedDocument;
  }
}
```

4. Add your document type to the derived types of the `SerializableType` type located at `src/document/types.ts` file!

```ts
import { EdiX12Type } from './x12';
import { XmlType } from './xml';
import { JsonType } from './json';
import { CsvType } from './csv';

export type SerializableType = EdiX12Type | XmlType | JsonType | CsvType;

export type SerializedType = string;
```

5. Add your `CSVDocument` class object factory to the list of document providers located at the file `src/document/providers.ts`:

```ts
import { BadRequestException } from '@nestjs/common';
import { AllowedContentTypes } from '../../constants/allowed-content-types';
import { JSONDocument, JsonType } from './json';
import { EdiX12Document, EdiX12Type } from './x12';
import { XMLDocument, XmlType } from './xml';
import { CSVDocument, CSVType } from './csv';

export const providers = {
  [AllowedContentTypes.x12]: (document, contentType, options) => {
    const { segmentDelimiter, elementDelimiter } = options || {};

    if (!segmentDelimiter || !elementDelimiter)
      throw new BadRequestException(
        'Parameters segmentDelimiter and elementDelimiter are required for this document type',
      );

    return new EdiX12Document(document as EdiX12Type, contentType, options);
  },
  [AllowedContentTypes.xml]: (document, contentType, options) => {
    return new XMLDocument(document as XmlType, contentType, options);
  },
  [AllowedContentTypes.json]: (document, contentType, options) => {
    return new JSONDocument(document as JsonType, contentType, options);
  },
  [AllowedContentTypes.csv]: (document, contentType, options) => {
    return new CSVDocument(document as CsvType, contentType, options);
  },
};
```

And that's it! You should now be able to transform any of the supported document types into a csv document!

