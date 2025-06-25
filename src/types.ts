import type { Resource } from './alternate';

export type Task = {
  title: string;
  description: string;
  storypoint: string;
  status: Resource<TaskStatus>;
  priority: Resource<TaskPriority>;
};

export type TaskIn = {
  title: string;
  description: string;
  storypoint: string;
  status: Resource<TaskStatus>['id'];
  priority: Resource<TaskPriority>['id'];
};

export type TaskStatus = {
  code: string;
  label: string;
};

export type TaskPriority = {
  code: string;
  label: string;
  color: string;
};
