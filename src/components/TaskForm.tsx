import {
  Stack,
  Text,
  Textarea,
  TextInput,
  NativeSelect,
  SegmentedControl,
  Group,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import { useTaskStatusesQuery } from '../hooks';
import type { Task } from '../types';

interface TaskFormProps {
  initialValues?: Task;
  onSubmit: (values: Task) => void;
}

const EMPTY_TITLE_ERROR = 'Title cannot be empty';
const EMPTY_STATUS_ERROR = 'Status cannot be empty';
const STORYPOINT_OPTIONS = ['1', '2', '3', '5', '8', '13'];

export function TaskForm(props: TaskFormProps) {
  const { initialValues, onSubmit } = props;

  const { data: taskStatuses } = useTaskStatusesQuery();

  const taskStatusOptions = taskStatuses?.map((taskStatus) => {
    return {
      label: taskStatus.attributes.label,
      value: taskStatus.attributes.code,
    };
  });

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: initialValues?.title || 'Task',
      description: initialValues?.description || '',
      storypoint: initialValues?.storypoint || STORYPOINT_OPTIONS[0],
      status: taskStatusOptions?.[0]?.value || '',
    },
    validate: {
      title: (value: string) => (value ? null : EMPTY_TITLE_ERROR),
      status: (value: string) => (value ? null : EMPTY_STATUS_ERROR),
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

        <Group align='start'>
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
              Status
            </Text>
            <NativeSelect
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
