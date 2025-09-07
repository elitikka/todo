/*This file will import selectAllTasks 
function from model and will call it to return data to set status and return value as 
JSON. Try-catch block will catch errors, also ones occurring on model. In case there is 
an error, it will be forwarded to the middleware defined in index.js. 
*/
import { selectAllTasks, insertTask, deleteTask } from '../models/Task.js' 
import { ApiError } from '../helper/api.js'
 
const getTasks = async (req, res,next) => { 
  try { 
    const result = await selectAllTasks() 
    return res.status(200).json(result.rows || []) 
  } catch (error) { 
    return next(error) 
  } 
} 
 
/* On controller create function for handling post request for adding a new task. Basic data 
validation can be executed before saving data. Different HTTP status codes might be 
used to describe, what kind of error has happened on the server. Remember to import 
insertTask (not illustrated on the figure). */


const postTask = async (req, res,next) => { 
  const { task }  = req.body 
   console.log("Task to create:", task) 
  try { 
    if (!task || !task.description || task.description.trim().length === 0) { 
      return next(new ApiError('Task description is required', 400)) 
      /*
    try { 
    if (!task || !task.description || task.description.trim().length === 0) { 
      const error = new Error('Task description is required')
      error.status = 400 
      return next(error) */
    } 
    const result = await insertTask(task.description) 
    return res.status(201).json({id: result.rows[0].id, description: result.rows[0].description}) 
  } catch (error) {
    return next(error) 
  } 
}  


// teht 8 loppu
const removeTask = async (req, res, next) => { // nimetty removeTask jotta olisi eri kuin deleteTask
    const {id} = req.params
    try {
        const result = await deleteTask(id) // deleteTask importattu modelsseista
        if (result.rows.length === 0) {
            return next (new ApiError('Task not found', 404))
        }
        return res.status (200).json(result.rows[0])
    } catch (error) {
        return next(error)
    }
}



export { getTasks, postTask, removeTask }