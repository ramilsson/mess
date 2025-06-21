export enum RawAttributeType {
  LITERAL_NUMBER = 'LITERAL_NUMBER',
  LITERAL_STRING = 'LITERAL_STRING',
  LITERAL_BOOLEAN = 'LITERAL_BOOLEAN',
}

export interface RawAttribute<TData = Record<string, unknown>> {
  id: string;
  resourceId: string;
  name: keyof TData;
  value: TData[keyof TData];
  type: RawAttributeType;
}

export interface RawResource<TData extends Record<string, unknown>> {
  id: string;
  collectionId: string;
  attributes: RawAttribute<TData>[];
}

export interface Resource<TAttributes extends Record<string, unknown>> {
  id: RawResource<TAttributes>['id'];
  collectionId: RawResource<TAttributes>['collectionId'];
  attributes: TAttributes;
}
