import { useResourceUpdateMutation, type Resource } from '../alternate';
import type { Task } from '../types';

export const useTaskUpdateMutation = (task: Resource<Task>) => {
  return useResourceUpdateMutation<Task>(task);
};
