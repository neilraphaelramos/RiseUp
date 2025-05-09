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
import Recovery_Message from './component/pages/account recovery/accrec-message/recovery-message';

import Content_Dashboard from './component/pages/content/dash-content/content';
import Dashboard_Form from './component/pages/content/dash-content/contend-for-today/dashboard-form';
import Video_GC from './component/pages/content/God-Centered-Video/video_GC';



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
        path: '/dashboard/for-today',
        element: <Content_Dashboard />
      },
      {
        path: '/dashboard/for-today',
        element: <Dashboard_Form />
      },
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
        path: '/forget-password/verification-message',
        element: <Recovery_Message />,
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
