import axios from 'axios';
import { API_URL } from '../settings';
import type { Resource } from '../types';

export async function fetchResources<TData = Record<string, unknown>>(
  collectionId: string
) {
  const response = await axios.get<Array<Resource<TData>>>(
    `${API_URL}/resource`,
    {
      params: { collectionId },
    }
  );

  return response.data;
}
