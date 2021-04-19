import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

toast.configure();
const NewUserPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const uri = process.env.REACT_APP_SERVER_URI;
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== retypePassword) {
      alert("passwords did not match");
      setPassword("");
      setRetypePassword("");
    } else {
      try {
        const { data } = await axios.post(`${uri}/register`, {
          name,
          username: email,
          password,
        });
        //console.log(data);

        setName("");
        setEmail("");
        setPassword("");
        setRetypePassword("");
        toast(data.message);

        if (data.message === "Account created successfully.")
          history.push("/login");
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  return (
    <div className="newuserpage container">
      <form onSubmit={handleSubmit} className="col-md-6">
        <h1 className="text-center mt-4 mb-4">Register</h1>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            id="name"
            aria-describedby="nameHelp"
            placeholder="Enter name"
            required
          />
        </div>
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
            required
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="retypePassword">Retype Password</label>
          <input
            type="password"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
            className="form-control"
            id="retypePassword"
            placeholder="Retype Password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/login" className="ml-2">
          Already registered?
        </Link>
      </form>
    </div>
  );
};
export default NewUserPage;
