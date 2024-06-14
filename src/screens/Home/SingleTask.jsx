import React, {useState} from 'react'
import './SingleTask.scss'
import { Button, Modal } from '@mui/material';
import UpdateTask from './UpdateTask';
import DetailedTask from './DetailedTask';

const SingleTask = ({task}) => {

  const {title, description, dueDate, priority} = task;
  const [isUpdateTaskOpen, setIsUpdateTaskOpen] = useState(false);
  const [isDetailedTaskOpen, setIsDetailedTaskOpen] = useState(false);
  const priorityColor = priority === 'High' ? '#FF6969' : priority === 'Medium' ? '#FD9B63' : '#81A263';

  return (
    <div className='single-task-container'>
        <header>
            <p style={{backgroundColor: priorityColor}}>{priority}</p>
            <h1>{title}</h1>
        </header>
        <main>
            <p>{description}</p>
        </main>
        <aside>
            <p>Due by: {dueDate?.split("T")[0]}</p>
        </aside>
        <footer>
          <Button onClick={() => setIsUpdateTaskOpen(true)} variant="contained" color="primary">Edit</Button>
          <Button onClick={() => setIsDetailedTaskOpen(true)} variant="contained" color="error">View task</Button>
        </footer>
        <Modal open={isDetailedTaskOpen}><DetailedTask task={task} openModal={setIsDetailedTaskOpen} /></Modal>
        <Modal open={isUpdateTaskOpen}><UpdateTask task={task} openModal={setIsUpdateTaskOpen} /></Modal>
    </div>
  )
}

export default SingleTask