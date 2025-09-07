/* UseUser hook provides access to context, which enables access to user state and related 
functions easily.   */

import { useContext } from "react"; 
import { UserContext } from "./UserContext"; 
 
export const useUser = () => { 
  return useContext(UserContext) 
}