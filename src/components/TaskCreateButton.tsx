import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import type { Task } from '../types';
import { useTaskCreateMutation } from '../hooks';
import { TaskForm } from './TaskForm';

export function TaskCreateButton() {
  const taskCreateMutation = useTaskCreateMutation();

  const handleClick = () => {
    const handleSubmit = (values: Task) => {
      modals.closeAll();
      taskCreateMutation.mutate(values);
    };

    modals.open({
      size: 'lg',
      title: 'Create task',
      children: <TaskForm onSubmit={handleSubmit} />,
    });
  };

  return <Button onClick={handleClick}>Create task</Button>;
}
