import React, { useEffect, useState } from "react";
import SingleTask from "./SingleTask";
import "./Tasks.scss";
import { Button, Modal } from "@mui/material";
import CreateTask from "./CreateTask";
import { useDispatch, useSelector } from "react-redux";
import { useGetCall } from "../../hooks/api/apiCaller";
import { addAllTasks } from "../../store/slice/tasks.slice";

const Tasks = () => {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const tasks = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const URL = process.env.REACT_APP_BASE_URL + "/api/task/user/" + user?._id;
  const {data, loading, error, callApi} = useGetCall(URL);

  useEffect(() => {
    callApi();
  }, [user?._id])

  useEffect(() => {
    if (loading || (error === true)) return;
    if(data) {
      console.log(data);
    dispatch(addAllTasks(data));
    }
  }, [data, loading, error])

  return (
    <div className="tasks-main-container">
      <h1>Tasks</h1>
      <Button sx={{marginBottom: "1rem"}} onClick={() => setIsCreateTaskOpen(true)} variant="contained" color="primary">
        Add Task
      </Button>
      <Modal open={isCreateTaskOpen}>
        <CreateTask openModal={setIsCreateTaskOpen} />
      </Modal>
      <div className="tasks-container">
        {
          tasks.map((task) => {
            return <SingleTask key={task._id} task={task} />
          })
        }
      </div>
    </div>
  );
};

export default Tasks;
