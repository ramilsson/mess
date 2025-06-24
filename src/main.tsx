import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import App from './App.tsx';
import { AlternateProvider } from './alternate';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <AlternateProvider>
      <Notifications position='top-center' />

      <ModalsProvider>
        <App />
      </ModalsProvider>
    </AlternateProvider>
  </MantineProvider>
);
