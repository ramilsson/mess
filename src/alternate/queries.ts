import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { API_URL } from '../settings';
import { type Resource } from './types';
import { notifications } from '@mantine/notifications';

export function useResourcesQuery<TPayload extends Record<string, unknown>>(
  collectionId: string,
  include?: (keyof TPayload)[]
) {
  return useQuery({
    queryKey: ['resource', collectionId],
    refetchOnMount: false,
    queryFn: async () => {
      const response = await axios.get<Resource<TPayload>[]>(
        `${API_URL}/resource`,
        {
          params: { collectionId, include: include || [] },
          paramsSerializer: (params) => {
            const searchParams = new URLSearchParams();

            for (const key in params) {
              const value = params[key];

              if (Array.isArray(value)) {
                value.forEach((item) => searchParams.append(key, item));
              } else {
                searchParams.append(key, value);
              }
            }

            return searchParams.toString();
          },
        }
      );

      return response.data;
    },
  });
}

export function useResourceCreateMutation<
  TPayloadIn extends Record<string, unknown>
>(collectionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TPayloadIn) => {
      return axios.request({
        method: 'post',
        url: `${API_URL}/resource`,
        data: {
          collectionId: collectionId,
          payload: payload,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resource', collectionId] });
    },
    onError: (error) => {
      console.error(error);

      notifications.show({
        title: error.name,
        message: error.message,
        color: 'red',
      });
    },
  });
}

export function useResourceUpdateMutation<
  TPayload extends Record<string, unknown>,
  TPayloadIn extends Record<string, unknown>
>(resource: Resource<TPayload>) {
  const resourceId = resource.id;
  const collectionId = resource.collectionId;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TPayloadIn) => {
      return axios.request({
        method: 'patch',
        url: `${API_URL}/resource/${resourceId}`,
        data: { payload: payload },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resource', collectionId] });
    },
    onError: (error) => {
      console.error(error);

      notifications.show({
        title: error.name,
        message: error.message,
        color: 'red',
      });
    },
  });
}
