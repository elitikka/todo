import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Row from './components/Row'

const url ="http://localhost:3001"

/*
State variables are used to hold data for input and tasks displayed on the list. Task is 
as string (description of a task) and Tasks is an array containing all tasks.
*/ 
function App() {
  const [task, setTask] = useState ('')
  const [tasks, setTasks] = useState([])

useEffect(() => {
  axios.get(url)
  .then(response => {
    setTasks(response.data)
  })
  .catch(error=> {
    alert(error.response.data ? error.response.data.message : error)
  })
}, [])


/* AddTask function adds new task into array immutable way (a full copy of an array is created using spread operator and new task description is added). 
After adding a new task input field is emptied by resetting state variable to empty string.  */

  const addTask = () => {
    const newTask = {description: task}

    axios.post(url +"/create",{task: newTask})
    .then(response => {
      setTasks([...tasks,response.data])
      setTask('')
    })
    .catch(error=> {
      alert(error.response ? error.response.data.error.message:error)
    })
  }

/* Delete function receives task (description) as parameter and removes it from array using filter. State is updated without removed task. */

  const deleteTask = (deleted) => {
    axios.delete(url+"/delete/" + deleted)
    .then(response => {
      setTasks(tasks.filter(item => item.id !== deleted))
    })
    .catch(error=> {
      alert(error.response ? error.response.data.error.message : error)
    })
  }
  
  /* Simple form to add a new task and a list, where tasks are displayed.
  If user edits task description on input state variable is updated accordingly. 
  If Enter key is pressed, new task is created.

  Browser’s default behaviour is to send data to the backend (which does not even exist) and this will also cause browser to refresh. 
  This is prevented by calling preventDefault for onKeyDown event (shortly e is used for event).  

  Map is used to loop through array of tasks and display each task on a row inside unordered list. Test, that you are able add new tasks and list is displayed. 
  */
  return (
      <div id="container">
        <h3>Todos</h3>
        <form>
          <input 
            placeholder='Add new task'
            value={task}
            onChange={e => setTask(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addTask()
              }
            }} 
            />
        </form>
      <ul> 
        { 
          tasks.map(item => ( 
          <Row item={item} key={item.id} deleteTask={deleteTask} />

            /* yllä oleva row item juttu korvaa tähän kommenttiin jääneen osan. row on tehty omaksi komponentiksi.
            <li key={item.id}> 
              {item.description} 
              <button className='delete-button' onClick={() =>    
                deleteTask(item.id)}>Delete</button> 
            </li> */
          )) 
        } 
      </ul>
      </div>
  )
}

export default App
