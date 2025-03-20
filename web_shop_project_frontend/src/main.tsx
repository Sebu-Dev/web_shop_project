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
import ProductDetails from './components/product/ProductDetails.tsx';
import { ProductPagination } from './components/product/ProductPageination.tsx';
import 'react-loading-skeleton/dist/skeleton.css';

import { ROUTES } from './config/Routes.ts';
import CheckoutSuccess from './pages/Checkout/CheckoutSuccess.tsx';
import CheckoutPage from './pages/Checkout/CheckoutPage.tsx';
import { EditUserProfile } from './components/user/EditUserProfile.tsx';
import { OrderHistory } from './components/user/OrderHistory.tsx';

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
        path: ROUTES.CHECKOUT,
        element: <CheckoutPage />,
      },
      {
        path: ROUTES.CHECKOUT_SUCCESS,
        element: <CheckoutSuccess />,
      },
      {
        path: ROUTES.PRODUCT_DETAILS,
        element: <ProductDetails />,
      },
      {
        path: ROUTES.USER_EDIT,
        element: <EditUserProfile />,
      },
      {
        path: ROUTES.USER_ORDERS,
        element: <OrderHistory />,
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
