import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import type { TaskIn } from '../types';
import { useTaskCreateMutation } from '../hooks';
import { TaskForm } from './TaskForm';

export function TaskCreateButton() {
  const taskCreateMutation = useTaskCreateMutation();

  const handleClick = () => {
    const handleSubmit = (values: TaskIn) => {
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
