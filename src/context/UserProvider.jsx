/* Next implement userProvider which contains state variable for user information and sign 
in/up functions. Async/await syntax is used to call backend with Axios.  This enables to 
catch errors easily when calling function from component(s). After successful sign-up 
email and password are set to empty string and user must provide information when 
signing in. After successful login user data is stored into session storage containing 
token which is used to authorize user when calling backend. 
 
UserProvider component will provide context wrapping in all components in this 
application (are rendered inside provider using {children}). Value for the context is user 
state and functions setUser, signUp and signIn which can be used/called from all 
components within this application. */

import { useState } from 'react' 
import { UserContext } from './UserContext' 
import axios from 'axios' 
 
export default function UserProvider({children}) { 
  const userFromStorage = sessionStorage.getItem('user') 
  const [user, setUser] = useState(userFromStorage ? JSON.parse(userFromStorage) : {email: '', password: ''}) 
 
  const signUp = async () => { 
    const headers = {headers: {'Content-Type': 'application/json'}}    
    await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, JSON.stringify({user: user}), headers) 
    setUser({email: '', password: ''}) 
  } 
 
  const signIn = async (email, password) => { 
    const headers = {headers: {'Content-Type': 'application/json'}} 
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/signin`, JSON.stringify({user: user}), 
headers) 
    setUser(response.data) 
    sessionStorage.setItem('user', JSON.stringify(response.data)) 
  }
    return ( 
    <UserContext.Provider value={{user,setUser,signUp, signIn}}> 
      {children} 
    </UserContext.Provider> 
  )}