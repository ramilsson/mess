import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { API_URL } from '../settings';
import { RawAttributeType, type Resource, type RawResource } from './types';

function getRawAttributeType(value: unknown): RawAttributeType {
  if (typeof value === 'number') return RawAttributeType.LITERAL_NUMBER;
  if (typeof value === 'boolean') return RawAttributeType.LITERAL_BOOLEAN;

  return RawAttributeType.LITERAL_STRING;
}

function transformResource<TAttributes extends Record<string, unknown>>(
  rawResource: RawResource<TAttributes>
): Resource<TAttributes> {
  return {
    ...rawResource,
    attributes: rawResource.attributes.reduce((acc, attribute) => {
      acc[attribute.name] = attribute.value;
      return acc;
    }, {} as TAttributes),
  };
}

export function useResourcesQuery<TAttributes extends Record<string, unknown>>(
  collectionId: string
) {
  return useQuery({
    queryKey: ['resource', collectionId],
    refetchOnMount: false,
    select: (data) => data.map(transformResource),
    queryFn: async () => {
      const response = await axios.get<RawResource<TAttributes>[]>(
        `${API_URL}/resource`,
        {
          params: { collectionId },
        }
      );

      return response.data;
    },
  });
}

export function useResourceCreateMutation<
  TAttributes extends Record<string, unknown>
>(collectionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (attributes: TAttributes) => {
      return axios.request({
        method: 'post',
        url: `${API_URL}/resource`,
        data: {
          collectionId: collectionId,
          attributes: Object.entries(attributes).map(([key, value]) => ({
            name: key,
            value: value,
            type: getRawAttributeType(value),
          })),
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resource', collectionId] });
    },
  });
}

export function useResourceUpdateMutation<
  TAttributes extends Record<string, unknown>
>(resource: Resource<TAttributes>) {
  const resourceId = resource.id;
  const collectionId = resource.collectionId;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (attributes: TAttributes) => {
      return axios.request({
        method: 'patch',
        url: `${API_URL}/resource/${resourceId}`,
        data: {
          attributes: Object.entries(attributes).map(([key, value]) => ({
            name: key,
            value: value,
            type: getRawAttributeType(value),
          })),
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resource', collectionId] });
    },
  });
}
