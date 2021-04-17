import React, { useEffect, useState } from "react";
import axios from "axios";
import "./homepage.css";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const HomePage = () => {
  const [results, setResults] = useState([]);
  const [render, setRender] = useState(false);
  const uri = process.env.REACT_APP_SERVER_URI;
  const history = useHistory();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const { data } = await axios.get(`${uri}/`);
        setResults(data.results);
        setRender(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllUsers();
  }, [uri, render]);

  const addUserHandler = () => {
    history.push("/users/new");
  };

  const deleteUserHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${uri}/${id}`);
      toast(data.message);
      setRender(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const editUserHandler = (id) => {
    history.push(`/users/update/${id}`);
  };

  return (
    <div>
      <div className="heading">
        <h1>Users Table</h1>
        <button onClick={addUserHandler}>Add User</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td>{result.id}</td>
              <td>{result.name}</td>
              <td>{result.email}</td>
              <td>
                <button onClick={() => editUserHandler(result.id)}>Edit</button>
              </td>
              <td>
                <button onClick={() => deleteUserHandler(result.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default HomePage;
