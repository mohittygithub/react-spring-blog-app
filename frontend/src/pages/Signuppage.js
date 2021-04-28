import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [profileImage, setProfileImage] = useState();
  const history = useHistory();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(profileImage);
    // localStorage.removeItem("createdUser");
    if (password !== retypePassword) {
      setPassword("");
      setRetypePassword("");
      toast.error("Passwords did not match");
    } else {
      const username = email;
      const uri = process.env.REACT_APP_SERVER_URI;
      try {
        const { data } = await axios.post(`${uri}/users/register`, {
          name,
          username,
          password,
        });
        if (data.message === "Email already registered") {
          setName("");
          setEmail("");
          setPassword("");
          setRetypePassword("");
          toast.error(data.message);
        } else {
          setName("");
          setEmail("");
          setPassword("");
          setRetypePassword("");
          history.push("/login");
          toast.success(data.message);
        }
      } catch (error) {
        console.log("Error => ", error.message);
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="container mt-5">
      <form className="col-md-6" onSubmit={formSubmitHandler}>
        <h1>Register</h1>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            id="name"
            placeholder="Enter name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="password"
            placeholder="Enter Password"
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
            placeholder="Retype password "
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="profileImage">Profile Image</label>
          <input
            type="file"
            accept=".jpg,.png,.jpeg"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
            className="form-control"
            id="profileImage"
            placeholder="chooseImage"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};
export default SignupPage;
