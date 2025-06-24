import { modals } from '@mantine/modals';
import { Paper, Group, Text, Badge } from '@mantine/core';

import { TaskForm } from '../TaskForm';

import type { Task } from '../../types';
import { type Resource } from '../../alternate';
import { useTaskUpdateMutation } from '../../hooks';

interface TaskCardProps {
  task: Resource<Task>;
}

export function TaskCard(props: TaskCardProps) {
  const { task } = props;

  const { title, storypoint, description } = task.payload;

  const taskUpdateMutation = useTaskUpdateMutation(task);

  const handleClick = () => {
    const handleSubmit = (values: Task) => {
      modals.closeAll();
      taskUpdateMutation.mutate(values);
    };

    modals.open({
      size: 'lg',
      title: 'Edit task',
      children: (
        <TaskForm initialValues={task.payload} onSubmit={handleSubmit} />
      ),
    });
  };

  return (
    <Paper key={task.id} p='xs' withBorder onClick={handleClick}>
      <Group justify='space-between'>
        <Text>{title}</Text>
        {storypoint && <Badge color='gray'>{storypoint}</Badge>}
      </Group>
      <Group>
        <Text size='xs' c='dimmed'>
          {description}
        </Text>
      </Group>
    </Paper>
  );
}
