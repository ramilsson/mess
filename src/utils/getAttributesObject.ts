import type { Attribute } from '../types';

export function getAttributesObject<TData = Record<string, unknown>>(
  attributes: Attribute<TData>[]
) {
  const attributesObject = {} as TData;

  attributes.forEach((attribute) => {
    attributesObject[attribute.name] = attribute.value;
  });

  return attributesObject;
}
