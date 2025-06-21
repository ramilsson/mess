export type Task = {
  title: string;
  description: string;
  storypoint: string;
  status: TaskStatus['code'];
};

export type TaskStatus = {
  code: string;
  label: string;
};
