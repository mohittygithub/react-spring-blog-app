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
        const { data } = await axios.get(`${uri}/`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
        });
        setResults(data.results);
        setRender(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllUsers();
  }, [uri, render]);

  const logoutHandler = () => {
    localStorage.clear();
    history.push("/login");
  };

  const deleteUserHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${uri}/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      });
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
    <div className="homepage container">
      <div className="heading container mb-4 d-flex justify-content-between align-items-center">
        <h1 className="mt-4 mb-5 text-center">Users Table</h1>
        <button onClick={logoutHandler} className="btn btn-primary btn-lg">
          <i className="fa fa-sign-out"></i>
        </button>
      </div>
      <div className="table">
        <table className="text-center container table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                <td>{result.id}</td>
                <td>{result.name}</td>
                <td>{result.email}</td>
                <td>
                  <button
                    onClick={() => editUserHandler(result.id)}
                    className="btn btn-success"
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => deleteUserHandler(result.id)}
                    className="btn btn-danger"
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default HomePage;
