import { useResourcesQuery } from '../alternate';
import { TASK_COLLECTION_ID } from '../constants';
import type { Task } from '../types';

export const useTasksQuery = () => {
  return useResourcesQuery<Task>(TASK_COLLECTION_ID, ['status', 'priority']);
};
