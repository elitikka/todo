/*  This will get pool from db.js and execute SQL 
statement(s) towards database. SelectAllTasks executes simple select statement 
returning all fields and records from task table. There is no need to implement error 
handling here, since controller will take case of that using try-catch block. */

import { pool } from '../helpers/db.js' 
 
const selectAllTasks = async () => { 
  return await pool.query('SELECT * FROM task') 
} 
 
/* Implement function for inserting task. Remember to export all functions, that are 
supposed to be imported elsewhere. */
const insertTask = async (description) => { 
  return await pool.query('insert into task (description) values ($1) returning *', [description])     
} 

// teht 8 loppu:
const deleteTask = async (id) => {
    return await pool.query ('DELETE FROM task WHERE id = $1 returning *', [id])
}


 
export { selectAllTasks, insertTask, deleteTask }