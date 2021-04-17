import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

toast.configure();

const UpdateUserPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const uri = process.env.REACT_APP_SERVER_URI;
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${uri}/`, { id, name, email });
      history.push("/");
      toast(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`${uri}/${id}`);
        setName(data.results.map((result) => result.name));
        setEmail(data.results.map((result) => result.email));
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [id, uri]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Edit User Info</h1>
        <div>
          <label>
            Name:
            <input
              type="text"
              placeholder={name}
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
              placeholder={email}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
export default UpdateUserPage;
