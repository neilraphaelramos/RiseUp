import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '../src/component/scss/styles.scss'

//Sign In Form
import SignInForm from './component/signin/SignInForm';
//Sign Up Form
import SignUpForm from './component/signup/SignUpForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignInForm />,
  },
  {
    path: '/registration',
    element: <SignUpForm />,
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
