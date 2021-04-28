import React, { useState } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const NewPostPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { userInfo } = useSelector((state) => state.userSignin);
  const { jwt } = userInfo;
  const history = useHistory();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const uri = process.env.REACT_APP_SERVER_URI;
      const { data } = await axios.post(
        `${uri}/posts`,
        { title, description },
        { headers: { Authorization: "Bearer " + jwt } }
      );
      if (data.message === "Post created successfully") {
        history.push("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center">
        <form className="col-md-6" onSubmit={formSubmitHandler}>
          <h1 className="mt-4 mb-5">New Post</h1>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              id="title"
              aria-describedby="titleHelp"
              placeholder="Enter title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="desc">Description</label>
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              id="desc"
              placeholder="Enter description"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default NewPostPage;
