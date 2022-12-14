import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserContext from './context';
import Balance from './routes/Balance';
import CreateAccount from './routes/CreateAccount';
import Login from './routes/Login';
import Withdrawal from './routes/Withdrawal';
import Deposit from './routes/Deposit';
import Logout from './routes/Logout';
import ErrorPage from './error-page';
import Root from './routes/Root';
import { AllData } from './routes/AllData';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'createAccount',
        element: <CreateAccount />,
      },
      {
        path: 'balance',
        element: <Balance />,
      },
      {
        path: 'deposit',
        element: <Deposit />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'withdrawal',
        element: <Withdrawal />,
      },
      {
        path: 'alldata',
        element: <AllData />,
      },
      {
        path: 'logout',
        element: <Logout />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContext.Provider
      value={{
        users: [
          {
            name: 'jose',
            email: 'jose@mit.edu',
            password: 'asdfasdf',
            balance: 100,
          },
        ],
      }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  </React.StrictMode>
);
