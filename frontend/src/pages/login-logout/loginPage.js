import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    const uri = process.env.REACT_APP_SERVER_URI;
    try {
      const { data } = await axios.post(`${uri}/authenticate`, {
        username: email,
        password,
      });
      if (data.jwt !== null) {
        localStorage.setItem("jwt", data.jwt);
        console.log(data);
        history.push("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container">
      <form className="col-md-6" onSubmit={submitHandler}>
        <h1 className="text-center mt-4 mb-4">Login</h1>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/register" className="ml-2">
          Not registered?
        </Link>
      </form>
    </div>
  );
};
export default LoginPage;
