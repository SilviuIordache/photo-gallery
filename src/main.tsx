import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ImageDetails from './components/gallery/ImageDetails.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:id" element={<ImageDetails />} />
        </Routes>
      </BrowserRouter>
      <a href="https://www.pexels.com" className="fixed bottom-0 right-0 m-4">
        Photos provided by Pexels
      </a>
    </QueryClientProvider>
  </StrictMode>
);
