/* Use React-router-com library to define routes (address and which 
component it corresponds to). ErrorElement definition will capture all invalid calls 
(wrong url) and displays NotFound page. There are also paths for signing in and signing 
up, which will display Authentication component using proper mode. App component is 
protected and only logged in users can access it. UserProvider wraps in RouterProvider 
(and all components in the application). This enables all components in the app to share 
user information (state) and related functions. */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// seuraavat on lisätty yllä olevan ohjeen perusteella:

import App from './screens/App' 
import Authentication, { AuthenticationMode } from './screens/Authentication' 
import ProtectedRoute from './components/ProtectedRoute' 
import UserProvider from './context/UserProvider' 
import { RouterProvider } from 'react-router-dom' 
import { createBrowserRouter } from "react-router-dom"; 
import NotFound from "./screens/NotFound"; 

const router = createBrowserRouter([ 
  { 
    errorElement: <NotFound /> 
  }, 
  { 
    path: "/signin", 
    element: <Authentication authenticationMode={AuthenticationMode.SignIn} /> 
  }, 
  { 
    path: "/signup", 
    element: <Authentication authenticationMode={AuthenticationMode.SignUp} /> 
  }, 
  {  
    element: <ProtectedRoute />, 
    children: [ 
      { 
        path: "/", 
        element: <App />, 
      } 
    ] 
  } 
]) 
 
createRoot(document.getElementById('root')).render( 
  <StrictMode> 
    <UserProvider> 
      <RouterProvider router={router} /> 
    </UserProvider> 
  </StrictMode>, 
)