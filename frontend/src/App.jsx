import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '../src/component/scss/styles.scss'

//Sign In Form
import SignInForm from './component/signin/SignInForm';
//Sign Up Form
import SignUpForm from './component/signup/SignUpForm';
//Dashboard
import DashboardPage from './component/homepage/dashboard';

//Reset Password
//Main Outlet for Reset Password
import Reset_Pass_Main from './component/pages/account recovery/reset-pass-main';
//Step 1
import Recovery_Email from './component/pages/account recovery/accrec-input/recovery-email';
//Step 2
import Recovery_Code from './component/pages/account recovery/accrec-code/recovery-code';
//Step 3 
import Recovery_NewPass from './component/pages/account recovery/accrec-newpass/recovery-newpass';
import Content_Dashboard from './component/pages/content/dash-content/content';


const router = createBrowserRouter([
  {
    path: '/',
    element: <SignInForm />,
  },
  {
    path: '/registration',
    element: <SignUpForm />,
  },
  {
    path:'/dashboard',
    element: <DashboardPage />,
    children: [
      {
        path: '/dashboard',
        element: <Content_Dashboard />
      }
    ]
  },
  {
    path: '/forget-password',
    element: <Reset_Pass_Main />,
    children: [
      {
        path: '/forget-password',
        element: <Recovery_Email />,
      },
      {
        path: '/forget-password/verification-code',
        element: <Recovery_Code />,
      },
      {
        path: '/forget-password/set-new-password',
        element: <Recovery_NewPass />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <div className='app'>
        <p className='version-display'>RiseUp Version 0.1 – In Developmental Stage</p>
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
