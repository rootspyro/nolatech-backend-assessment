import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './pages/SignUp.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUp from './pages/SignUp.tsx'
import SignIn from './pages/SignIn.tsx'

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>
    },
    {
      path: "/login",
      element: <SignIn /> 
    },
    {
      path: "/signup",
      element: <SignUp />
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
