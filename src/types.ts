export interface Attribute<TData = Record<string, unknown>> {
  id: string;
  resourceId: string;

  type: 'LITERAL_NUMBER' | 'LITERAL_STRING';
  name: keyof TData;
  value: TData[keyof TData];
}

export interface Resource<TData = Record<string, unknown>> {
  id: string;
  collectionId: string;
  attributes: Attribute<TData>[];
}

export interface Task {
  title: string;
  description: string;
  storypoint: string;
  status: TaskStatus['code'];
}

export interface TaskStatus {
  code: string;
  label: string;
}
