/* Define UserContext in the UserContext.js file. This will create a context, which is used 
to wrap in all components in React app. It allows components to share same state 
variables and functions related to user managing.*/

import { createContext } from 'react'

export const UserContext = createContext()