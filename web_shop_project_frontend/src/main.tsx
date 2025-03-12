import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { LandingPage } from './pages/LandingPage.tsx';
import { Contact } from './components/Contact.tsx';

import { About } from './components/About.tsx';
import { User } from './components/User.tsx';
import { Layout } from './Layout.tsx';
import { ProductPagination } from './components/ProductPageination.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'products',
        element: <ProductPagination />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'user/:id',
        element: <User />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
