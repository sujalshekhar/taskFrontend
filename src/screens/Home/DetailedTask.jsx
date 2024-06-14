import { Button } from '@mui/material';
import React from 'react'

const DetailedTask = ({task,openModal}) => {

  const {title, description, dueDate, priority} = task;

  return (
    <div style={{backgroundColor: "white"}}>
        <div>
            <header>
                <h1>Detailed task information</h1>
            </header>
            <div>
                <h2>{title}</h2>
                <p>{description}</p>
                <p>Due by: {dueDate?.split("T")[0]}</p>
                <p>Priority: {priority}</p>
            </div>
            <Button onClick={() => openModal(false)}>Close</Button>
        </div>
    </div>
  )
}

export default DetailedTask