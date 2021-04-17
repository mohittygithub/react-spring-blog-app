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
        const { data } = await axios.post(`${uri}/`, { name, email, password });
        console.log(data);

        setName("");
        setEmail("");
        setPassword("");
        setRetypePassword("");
        toast(data.message);
        history.push("/");
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>New User Registration</h1>
        <div>
          <label>
            Name:
            <input
              type="text"
              placeholder="enter name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              placeholder="enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              placeholder="enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Retype Password:
            <input
              type="password"
              placeholder="re-enter password"
              required
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button type="submit">Submit</button>
          <button>
            <Link to="/">Cancel</Link>
          </button>
        </div>
      </form>
    </div>
  );
};
export default NewUserPage;
