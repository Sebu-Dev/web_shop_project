import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LandingPage } from './pages/LandingPage.tsx';
import { Contact } from './components/Contact.tsx';
import { About } from './components/About.tsx';
import { User } from './components/user/User.tsx';
import { Layout } from './Layout.tsx';
import { ShoppingCart } from './components/ShoppingCart.tsx';
import { ROUTES } from './config/Routes.ts';
import ProductDetails from './components/product/ProductDetails.tsx';
import { ProductPagination } from './components/product/ProductPageination.tsx';
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: ROUTES.PRODUCTS,
        element: <ProductPagination />,
      },
      {
        path: ROUTES.SHOPPING_CART,
        element: <ShoppingCart />,
      },
      {
        path: ROUTES.ABOUT,
        element: <About />,
      },
      {
        path: ROUTES.CONTACT,
        element: <Contact />,
      },
      {
        path: ROUTES.USER,
        element: <User />,
      },
      {
        path: ROUTES.PRODUCT_DETAILS,
        element: <ProductDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
