import { useMemo } from 'react';
import { Paper, Stack, Group, Text, Box, Badge } from '@mantine/core';

import { getAttributesObject } from '../utils';
import type { Resource, Task, TaskStatus } from '../types';

interface TaskListProps {
  tasks: Resource<Task>[];
  status: Resource<TaskStatus>;
}

export function TaskList(props: TaskListProps) {
  const { tasks, status } = props;

  const statusAttributes = getAttributesObject(status.attributes);

  const filteredTasks = useMemo(() => {
    return tasks?.filter((task) => {
      const taskStatus = getAttributesObject(task.attributes).status;

      return statusAttributes.code === taskStatus;
    });
  }, [tasks, statusAttributes.code]);

  return (
    <Paper p='md' bg='gray.0' withBorder>
      <Stack>
        <Group>
          <Text fw='500'>{statusAttributes.label}</Text>
        </Group>
        <Box>
          <Stack align='stretch' justify='center' gap='xs'>
            {filteredTasks.map((task) => {
              const attributesObject = getAttributesObject(task.attributes);

              const title = attributesObject.title;
              const description = attributesObject.description;
              const storypoint = attributesObject.storypoint;

              return (
                <Paper key={task.id} p='xs' withBorder>
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
            })}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}
