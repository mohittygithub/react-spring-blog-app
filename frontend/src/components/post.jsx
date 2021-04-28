import React from "react";
import blog from "../static/images/blog.jpg";

const Post = ({ title, description, created }) => {
  return (
    <div className="d-flex border border-primary rounded-pill mb-2 w-75 mx-auto">
      <div>
        <img src={blog} alt="example" className="img-thumbnail rounded-pill" />
      </div>
      <div className="ml-3">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{created}</p>
      </div>
    </div>
  );
};
export default Post;
