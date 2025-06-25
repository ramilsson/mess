import { useResourcesQuery } from '../alternate';
import { TASK_PRIORITY_COLLECTION_ID } from '../constants';
import type { TaskPriority } from '../types';

export const useTaskPrioritiesQuery = () => {
  return useResourcesQuery<TaskPriority>(TASK_PRIORITY_COLLECTION_ID);
};
