import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import { useDispatch } from 'react-redux'

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const dispatch = useDispatch()

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData)
    dispatch(login())
  }

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit} >
      <h2 className="text-uppercase text-center mb-4">Petty island</h2>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handleChangeInput}
            value = {email}
          />
          <small id="emailHelp" clasName="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div class="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={handleChangeInput}
            value = {password}
          />
        </div>
        <button type="submit" className="btn btn-dark w-100" disabled = {email && password ? false : true }>
          Login
        </button>
        <p className="my-2">
          You don't have an account? <Link to = "/register" style={{ color : "crimson"}}>Register Now.</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
