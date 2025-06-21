import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import App from './App.tsx';
import { AlternateProvider } from './alternate';

import '@mantine/core/styles.css';

createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <AlternateProvider>
      <ModalsProvider>
        <App />
      </ModalsProvider>
    </AlternateProvider>
  </MantineProvider>
);
