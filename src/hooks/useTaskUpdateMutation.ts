import { useResourceUpdateMutation, type Resource } from '../alternate';
import type { Task, TaskIn } from '../types';

export const useTaskUpdateMutation = (task: Resource<Task>) => {
  return useResourceUpdateMutation<Task, TaskIn>(task);
};
