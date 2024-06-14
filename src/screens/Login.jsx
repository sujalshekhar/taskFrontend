import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import "./Register.scss";
import { Button } from "@mui/material";
import { usePostCall } from "../hooks/api/apiCaller";
import useLoginUser from "../hooks/loginUser";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const URL = `${process.env.REACT_APP_BASE_URL}/api/user/login`;
  const {loginUser} = useLoginUser();

  
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(formData)
    console.log("Form Submitted");
  }

  return (
    <div className="register-main-container">
      <div className="register-container">
        <header>
          <h1>Login</h1>
        </header>
        <form onSubmit={handleSubmit}>
          
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
          <Link to="/register"><Button variant="outlined">Register here</Button></Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
