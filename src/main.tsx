import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ImageDetailsPage from './components/imageDetails/index.tsx';
import Trademark from './components/misc/Trademark.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:id" element={<ImageDetailsPage />} />
        </Routes>
      </BrowserRouter>
      <Trademark />
    </QueryClientProvider>
  </StrictMode>
);
