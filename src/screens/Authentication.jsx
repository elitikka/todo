/*
Importing useUser on Authentication component --> component can access user 
information (state) and related functions. This was exactly why custom hook useUser 
was defined, since it provided very convenient way to access user information, which is 
implemented on UserProvider. Only a single file needs to be imported (useUser).*/

import { Link, useNavigate } from "react-router-dom" 
import { useUser } from "../context/useUser" 

/* Create component that is used for signing up and sign in (same component will used for both). 
An object and Object.freeze is used to create enumeration, which can be used to determine, 
whether sign up or sign in should be displayed (and functionality is different).  

Conditional rendering is used to display UI according in 
which mode (sign in or sign up) component is displayed. 
*/

export const AuthenticationMode = Object.freeze({ 
    SignIn: 'Login', 
    SignUp: 'SignUp' 
}) 


/* Implement function handleSubmit, which is executed when user presses a button inside 
form. Depending on mode user is signed up or signed in and redirected accordingly. In 
case there is an error it is displayed using alert. In JavaScript a function can be stored 
into variable. In this case signFunction is assigned either to signIn or signOut according 
to the situation.  */

 
export default function Authentication({authenticationMode}) { 
  const { user, setUser,signUp, signIn } = useUser() 
  const navigate = useNavigate() 
 
  const handleSubmit = async (e) => { 
    e.preventDefault() 
 
    const signFunction = authenticationMode === AuthenticationMode.SignUp ?  
      signUp : signIn 
    
    signFunction().then(response =>{ 
      navigate(authenticationMode === Authentication.SignUp ? '/signin' : '/') 
    }) 
    .catch(error => { 
      alert(error) 
    }) 
  } 
 

  // aiemmin oli kolme riviä alas returnin jälkeen rivi missä oli handleSubmit, niin siinä lopussa oli </form> mutta sen otin pois
  return ( 
    <div> 
      <h3>{authenticationMode === AuthenticationMode.SignIn ? 'Sign in' : 'Sign up'}</h3> 
      <form onSubmit={handleSubmit}>
        <label>Email</label> 
        <input  
          placeholder='Email'  
          value={user.email}  
          onChange={e => setUser({...user,email: e.target.value}) 
        }/> 
        <label>Password</label> 
        <input  
          placeholder='Password'  
          type='password' value={user.password}  
          onChange={e => setUser({...user,password: e.target.value})} 
        /> 
        <button type='submit'>{authenticationMode === AuthenticationMode.SignIn ? 'Login' : 'Submit'}</button> 
        <Link to={authenticationMode === AuthenticationMode.SignIn ? '/signup' : '/signin'}> 
          {authenticationMode === AuthenticationMode.SignIn ? 'No account? Sign up' : 'Already signed up? Sign in'} 
        </Link> 
      </form> 
    </div> 
  ) 
}






/*

export default function Authentication({authenticationMode}) { 
    return ( 
        <div> 
         <h3>{authenticationMode === AuthenticationMode.SignIn ?  
  'Sign in' : 'Sign up'}</h3> 
     <form> 
       <label>Email</label> 
       <input placeholder='Email' /> 
       <label>Password</label> 
       <input placeholder='Password' type='password' /> 
       <button type='submit'>{authenticationMode === AuthenticationMode.SignIn ? 'Login' : 'Submit'}</button> 
       <Link> 
         {authenticationMode === AuthenticationMode.SignIn ? 'No account? Sign up' : 'Already signed up? Sign in'} 
       </Link> 
     </form> 
   </div> 
  ) 
} 
*/