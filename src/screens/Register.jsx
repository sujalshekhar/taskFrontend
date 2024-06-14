import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import "./Register.scss";
import { Button } from "@mui/material";
import { usePostCall } from "../hooks/api/apiCaller";
import useLoginUser from "../hooks/loginUser";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const URL = `${process.env.REACT_APP_BASE_URL}/api/user/create`;
  const {data, loading, error, callApi} = usePostCall(URL);
  const {loginUser} = useLoginUser();

  useEffect(() => {
    if(loading || (error === true)) return;
    if(data) {
      console.log("User Registered", data);
      localStorage.setItem("token", data.headers.authorization);
      loginUser({});
    }
  }, [data, loading, error])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    callApi(formData);
    console.log("Form Submitted");
  }

  return (
    <div className="register-main-container">
      <div className="register-container">
        <header>
          <h1>Register yourself</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="name-container">
            <TextField
              error={false}
              id="filled-error-helper-text"
              label="What's your first name"
              defaultValue={formData.firstName}
              helperText=""
              variant="filled"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="input"
            />
            <TextField
              error={false}
              id="filled-error-helper-text"
              label="What's your last name"
              defaultValue={formData.lastName}
              helperText=""
              variant="filled"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="input"
            />
          </div>
          <div>
          <TextField
            error={false}
            id="filled-error-helper-text"
            label="What's your email"
            defaultValue={formData.email}
            helperText=""
            variant="filled"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="input"
          />
          </div>
          <TextField
            error={false}
            id="filled-error-helper-text"
            label="What's your password"
            defaultValue={formData.password}
            helperText=""
            variant="filled"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="input"
          />
          <Button type="submit" variant='outlined'>Submit</Button>
          <Link to="/login"><Button variant='outlined'>Login?</Button></Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
