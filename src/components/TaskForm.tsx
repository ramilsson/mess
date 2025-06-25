import {
  Stack,
  Text,
  Textarea,
  TextInput,
  Select,
  SegmentedControl,
  Group,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import { useTaskStatusesQuery, useTaskPrioritiesQuery } from '../hooks';
import type { Task, TaskIn } from '../types';

interface TaskFormProps {
  initialValues?: Task;
  onSubmit: (values: TaskIn) => void;
}

const EMPTY_FIELD_ERROR = 'Field cannot be empty';
const STORYPOINT_OPTIONS = ['1', '2', '3', '5', '8', '13'];

export function TaskForm(props: TaskFormProps) {
  const { initialValues, onSubmit } = props;

  const { data: taskStatuses } = useTaskStatusesQuery();
  const { data: taskPriorities } = useTaskPrioritiesQuery();

  const taskStatusOptions = taskStatuses?.map((status) => {
    return {
      value: status.id,
      label: status.payload.label,
    };
  });

  const taskPriorityOptions = taskPriorities?.map((priority) => {
    return {
      value: priority.id,
      label: priority.payload.label,
    };
  });

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: initialValues?.title || 'Task',
      description: initialValues?.description || '',
      storypoint: initialValues?.storypoint || STORYPOINT_OPTIONS[0],
      priority: initialValues?.priority?.id || '',
      status: initialValues?.status.id || taskStatusOptions?.[0]?.value || '',
    },
    validate: {
      title: (value: string) => (value ? null : EMPTY_FIELD_ERROR),
      status: (value: string) => (value ? null : EMPTY_FIELD_ERROR),
      priority: (value: string) => (value ? null : EMPTY_FIELD_ERROR),
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap='xs'>
        <TextInput
          label='Title'
          key={form.key('title')}
          {...form.getInputProps('title')}
        />

        <Textarea
          label='Description'
          rows={4}
          key={form.key('description')}
          {...form.getInputProps('description')}
        />

        <Group align='start' wrap='nowrap'>
          <div>
            <Text size='sm' fw={500}>
              Storypoint
            </Text>
            <SegmentedControl
              data={STORYPOINT_OPTIONS}
              key={form.key('storypoint')}
              {...form.getInputProps('storypoint')}
            />
          </div>
          <div>
            <Text size='sm' fw={500}>
              Priority
            </Text>
            <Select
              placeholder='Select priority'
              data={taskPriorityOptions}
              key={form.key('priority')}
              {...form.getInputProps('priority')}
            />
          </div>
          <div>
            <Text size='sm' fw={500}>
              Status
            </Text>
            <Select
              placeholder='Select status'
              data={taskStatusOptions}
              key={form.key('status')}
              {...form.getInputProps('status')}
            />
          </div>
        </Group>
        <Group justify='end'>
          <Button type='submit'>Save</Button>
        </Group>
      </Stack>
    </form>
  );
}
