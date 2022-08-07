import { EdiX12Type } from './x12';
import { XmlType } from './xml';
import { JsonType } from './json';

export type SerializableType = EdiX12Type | XmlType | JsonType;

export type SerializedType = string;
