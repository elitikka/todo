/*Under components folder define a new component with following content. This 
component checks if user has signed in. If not, user will be redirected to signin route. 
Otherwise, component defined in index.js is displayed by using outlet (in this case it is 
App and path is “/”).*/

import { useUser } from '../context/useUser' 
import { Outlet,Navigate } from 'react-router-dom' 
 
export default function ProtectedRoute() { 
  const { user } = useUser() 
  if (!user || !user.token) return <Navigate to ="/signin" replace /> 
  return (<Outlet />) 
}

