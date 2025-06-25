import { useResourceCreateMutation } from '../alternate';
import { TASK_COLLECTION_ID } from '../constants';
import type { TaskIn } from '../types';

export const useTaskCreateMutation = () => {
  return useResourceCreateMutation<TaskIn>(TASK_COLLECTION_ID);
};
