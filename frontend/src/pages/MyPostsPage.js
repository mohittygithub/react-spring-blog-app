import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Post from "../components/post";
import { getMyAllPosts } from "../redux/actions/post-actions";
import { ClipLoader } from "react-spinners";

const MyPostsPage = () => {
  const getMyPosts = useSelector((state) => state.getMyPosts);
  const userSignin = useSelector((state) => state.userSignin);
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = userSignin;
  const { jwt, username } = userInfo;
  const { myAllPosts, loading } = getMyPosts;

  const newPostHandler = () => {
    history.push("/posts/new");
  };

  useEffect(() => {
    dispatch(getMyAllPosts(username, jwt));
  }, [dispatch, jwt, username]);

  if (loading) {
    return (
      <div>
        <div className="d-flex align-items-center justify-content-around">
          <div>
            <h1 className="mt-4 mb-5">My Posts</h1>
          </div>
          <div>
            <ClipLoader loading={loading} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="d-flex align-items-center justify-content-around">
          <div>
            <h1 className="mt-4 mb-5">My Posts</h1>
          </div>
          <div>
            {userInfo && (
              <div>
                <button
                  className="btn btn-primary mr-2"
                  onClick={newPostHandler}
                >
                  New Post
                </button>
              </div>
            )}
          </div>
        </div>
        <div>
          {myAllPosts ? (
            myAllPosts.results.map((post) => (
              <div key={post.id}>
                <Post
                  title={post.title}
                  description={post.description}
                  created={post.created}
                />
              </div>
            ))
          ) : (
            <div>
              <h1>No Posts Found</h1>
            </div>
          )}
        </div>
      </div>
    );
  }
};
export default MyPostsPage;
