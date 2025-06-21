import { useResourcesQuery } from '../alternate';
import { TASK_STATUS_COLLECTION_ID } from '../constants';
import type { TaskStatus } from '../types';

export const useTaskStatusesQuery = () => {
  return useResourcesQuery<TaskStatus>(TASK_STATUS_COLLECTION_ID);
};
