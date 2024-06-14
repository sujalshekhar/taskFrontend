import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./CreateTask.scss";
import { useDispatch, useSelector } from "react-redux";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { usePostCall } from "../../hooks/api/apiCaller";
import { addSingleTask } from "../../store/slice/tasks.slice";

const CreateTask = ({ openModal }) => {
  const user = useSelector((state) => state.user);
  const URL = process.env.REACT_APP_BASE_URL + "/api/task/create";
  const { data, loading, error, callApi } = usePostCall(URL);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    user: user._id,
    priority: "Low",
  });

  useEffect(() => {
    if (loading || error === true) return;
    console.log(data?.data);
    if (data?.data) {
      dispatch(addSingleTask(data.data));
      openModal(false);
    }
  }, [data, loading, error]);

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

  return (
    <div className="create-task-modal-container">
      <div className="create-task-container">
        <header>
          <h1>Create new task</h1>
        </header>
        <form onSubmit={submitHandler}>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            name="title"
            onChange={changeInputHanlder}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            multiline
            name="description"
            onChange={changeInputHanlder}
          />
          <input type="date" name="dueDate" onChange={changeInputHanlder} />
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
              Create Task
            </Button>
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

export default CreateTask;
