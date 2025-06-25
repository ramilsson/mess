import { useMemo } from 'react';
import { Paper, Stack, Group, Text, Box } from '@mantine/core';

import { TaskCard } from './TaskCard';

import type { TaskStatus } from '../../types';
import { useTasksQuery } from '../../hooks';
import type { Resource } from '../../alternate';

interface TaskListProps {
  status: Resource<TaskStatus>;
}

export function TaskList(props: TaskListProps) {
  const { status } = props;

  const { data: tasks } = useTasksQuery();

  const filteredTasks = useMemo(() => {
    return tasks?.filter((task) => status.id === task.payload.status.id);
  }, [tasks, status.id]);

  return (
    <Paper p='md' bg='gray.0' pos='relative' withBorder>
      <Stack>
        <Group>
          <Text fw='500'>{status.payload.label}</Text>
        </Group>
        <Box>
          <Stack align='stretch' justify='center' gap='xs'>
            {filteredTasks?.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}
