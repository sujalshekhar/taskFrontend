import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./CreateTask.scss";
import { useDispatch, useSelector } from "react-redux";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useDeleteCall, usePutCall } from "../../hooks/api/apiCaller";
import { deleteSingleTask, updateSingleTask } from "../../store/slice/tasks.slice";

const UpdateTask = ({ openModal, task }) => {
  const user = useSelector((state) => state.user);
  const URL = process.env.REACT_APP_BASE_URL + "/api/task/update/" + task._id;
  const { data, loading, error, callApi } = usePutCall(URL);
  const DELETE_URL = process.env.REACT_APP_BASE_URL + "/api/task/delete/" + task._id;
  const { data: deleteData, loading: deleteLoading, error: deleteError, callApi: deleteCallApi } = useDeleteCall(DELETE_URL);
  const dispatch = useDispatch();
  const { title, description, dueDate, priority } = task;

  const [formData, setFormData] = useState({
    title: title,
    description: description,
    dueDate: dueDate,
    user: user._id,
    priority: priority,
  });

  useEffect(() => {
    if (loading || error === true) return;
    console.log(data);
    if (data) {
      dispatch(updateSingleTask(data));
      openModal(false);
    }
  }, [data, loading, error]);

  useEffect(() => {
    if (deleteLoading || deleteError === true) return;
    console.log(deleteData);
    if (deleteData) {
      dispatch(deleteSingleTask({ _id: task._id}));
      openModal(false);
    }
  }, [deleteData, deleteLoading, deleteError])

  const changeInputHanlder = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    callApi(formData);
  };

  const deleteHandler = () => {
    deleteCallApi();
  }

  return (
    <div className="create-task-modal-container">
      <div className="create-task-container">
        <header>
          <h1>Update task</h1>
        </header>
        <form onSubmit={submitHandler}>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            name="title"
            onChange={changeInputHanlder}
            value={formData.title}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            multiline
            name="description"
            onChange={changeInputHanlder}
            value={formData.description}
            defaultValue={formData.description}
          />
          <input value={formData.dueDate || '2022-01-01'} type="date" name="dueDate" onChange={changeInputHanlder} />
          <div className="select-dropdown">
            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.priority}
              label="What is the priority of this task?"
              onChange={changeInputHanlder}
              name="priority"
              className="select"
              fullWidth
            >
              <MenuItem value={"Low"}>Low</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"High"}>High</MenuItem>
            </Select>
          </div>
          <div className="button-container">
            <Button
              className="button"
              type="submit"
              variant="contained"
              color="primary"
            >
              Update Task
            </Button>
            <Button onClick={deleteHandler} variant='contained'>Delete</Button>
            <Button
              onClick={() => {
                console.log("clicked");
                openModal(false);
              }}
              className="button"
              variant="contained"
              color="error"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
