import { useEffect, useState } from 'react';
import {
  Flex,
  Grid,
  Text,
  Stack,
  Divider,
  AppShell,
  Container,
} from '@mantine/core';

import { TaskList } from './components';
import type { Resource, Task, TaskStatus } from './types';
import { TASK_COLLECTION_ID, TASK_STATUS_COLLECTION_ID } from './constants';
import { fetchResources } from './utils';

function App() {
  const [tasks, setTasks] = useState<Resource<Task>[]>([]);
  const [taskStatuses, setTaskStatuses] = useState<Resource<TaskStatus>[]>([]);

  useEffect(() => {
    fetchResources<Task>(TASK_COLLECTION_ID)
      .then(setTasks)
      .catch(console.error);

    fetchResources<TaskStatus>(TASK_STATUS_COLLECTION_ID)
      .then(setTaskStatuses)
      .catch(console.error);
  }, []);

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: 'sm',
      }}
    >
      <AppShell.Navbar p='md' bg='gray.0'>
        <Flex gap='4px' align='flex-start' p='md'>
          <Text
            fw={900}
            size='36px'
            component='h1'
            tt='uppercase'
            variant='gradient'
            gradient={{ from: 'blue', to: 'pink', deg: 90 }}
          >
            {__APP_NAME__}
          </Text>
          <Text size='xs' c='dimmed' fw="500">
            {__APP_VERSION__}
          </Text>
        </Flex>

        <Divider mt='md' />

        <Stack></Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        <Container p='md' fluid>
          <Grid grow>
            {taskStatuses.map((taskStatus) => {
              return (
                <Grid.Col key={taskStatus.id} span={3}>
                  <TaskList tasks={tasks} status={taskStatus} />
                </Grid.Col>
              );
            })}
          </Grid>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
