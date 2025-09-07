/* Adding and deleting tasks should be allowed only for users that are logged in. 
For this purpose, auth.js is created under helper folder. 

Function will try to read authorization header from the http call coming from client. 
If header exists and token matches, user is authorized. */

import jwt from 'jsonwebtoken' 
 
const  { verify } = jwt 
 

const auth = (req,res,next) => { 
  const token = req.headers['authorization'] 
  if(!token) { 
    return res.status(401).json({ message: 'No token provided' }) 
  } 
  verify(token, process.env.JWT_SECRET, (err, decoded) => { 
    if(err) { 
      return res.status(401).json({ message: 'Failed to authenticate token' }) 
    } 
    next() 
  }) 
} 
 
export { auth }