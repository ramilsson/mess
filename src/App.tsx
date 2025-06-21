import {
  Flex,
  Grid,
  Text,
  Stack,
  Divider,
  AppShell,
  Container,
  Paper,
  Title,
} from '@mantine/core';

import { TaskCreateButton, TaskList } from './components';
import { useTaskStatusesQuery } from './hooks';

function App() {
  const { data: taskStatuses } = useTaskStatusesQuery();

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
        <Container pt='md' fluid>
          <Paper p='md' withBorder>
            <Flex justify='space-between'>
              <Title order={2}>Tasks</Title>
              <TaskCreateButton />
            </Flex>
          </Paper>
        </Container>

        <Container p='md' fluid>
          <Grid grow>
            {taskStatuses?.map((taskStatus) => {
              return (
                <Grid.Col key={taskStatus.id} span={3}>
                  <TaskList status={taskStatus} />
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
