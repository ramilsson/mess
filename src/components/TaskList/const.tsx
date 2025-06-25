import type React from 'react';
import {
  IconEqual,
  IconChevronUp,
  IconChevronsUp,
  IconChevronDown,
} from '@tabler/icons-react';
import type { TaskPriority } from '../../types';

export const taskPriorityIconByCode: Record<
  TaskPriority['code'],
  React.ReactNode
> = {
  LOW: <IconChevronDown />,
  NORMAL: <IconEqual />,
  HIGH: <IconChevronUp />,
  CRITICAL: <IconChevronsUp />,
};

export const taskPriorityOrderByCode: Record<TaskPriority['code'], number> = {
  LOW: 3,
  NORMAL: 2,
  HIGH: 1,
  CRITICAL: 0,
};
