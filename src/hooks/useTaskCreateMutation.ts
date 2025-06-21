import { useResourceCreateMutation } from '../alternate';
import { TASK_COLLECTION_ID } from '../constants';
import type { Task } from '../types';

export const useTaskCreateMutation = () => {
  return useResourceCreateMutation<Task>(TASK_COLLECTION_ID);
};
