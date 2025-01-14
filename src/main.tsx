import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <a href="https://www.pexels.com" className="fixed bottom-0 right-0 m-4">
        Photos provided by Pexels
      </a>
    </QueryClientProvider>
  </StrictMode>
);
