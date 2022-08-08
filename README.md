# Description

A simple yet extensible document converter backend application made with Nest.js.

## Installation

```bash
$ npm install
```
## Building the application

```
$ npm run build
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
# Converting Documents

To convert a document you can simply issue a POST request to the `/convert` route:

### Converting from EDI-X12 to JSON
```sh
curl --request POST \
  --url 'http://localhost:3000/conversion?targetFormat=json&segmentDelimiter=~&elementDelimiter=*' \
  --header 'Content-Type: application/edi-x12' \
  --data '<your-x12-edi-text-goes-here>'
```

NOTE: Parameters: `segmentDelimiter` and `elementDelimiter` are always required when converting to and from EDI-X12.

### Converting from XML to JSON
```sh
curl --request POST \
  --url 'http://localhost:3000/conversion?targetFormat=json' \
  --header 'Content-Type: application/xml' \
  --data '<your-xml-content-goes-here>'
```

NOTE: if your XML content has a parent root element, make sure you send a querystring parameter called `parentRootElement` like so: `http://localhost:3000/conversion?targetFormat=json&parentRootElement=root`.

### Converting from JSON to EDI-X12
```sh
curl --request POST \
  --url 'http://localhost:3000/conversion?targetFormat=x12&elementDelimiter=*&segmentDelimiter=~' \
  --header 'Content-Type: application/json' \
  --data '<your-json-content-goes-here>'
```

NOTE: Parameters: `segmentDelimiter` and `elementDelimiter` are always required when converting to and from EDI-X12.

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
...
import { CsvType } from './csv';

export type SerializableType = EdiX12Type | XmlType | JsonType | CsvType;
```

5. Add your `CSVDocument` class object factory to the list of document providers located at the file `src/document/providers.ts`:

```ts
  ...
  [AllowedContentTypes.csv]: (document, contentType, options) => {
    return new CSVDocument(document as CsvType, contentType, options);
  },
};
```

And that's it! You should now be able to transform any of the supported document types into a csv document!

