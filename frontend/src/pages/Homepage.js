import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Post from "../components/post";
import { getAllPosts, myAllPosts } from "../redux/actions/post-actions";
import { ClipLoader } from "react-spinners";

const Homepage = () => {
  const getPosts = useSelector((state) => state.getAllPosts);
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, allPosts } = getPosts;
  const { userInfo } = userSignin;
  // const { username, jwt } = userInfo;
  const history = useHistory();
  const dispatch = useDispatch();

  const newPostHandler = () => {
    history.push("/posts/new");
  };

  const myPostsHandler = () => {
    // dispatch(myAllPosts(username, jwt));
    history.push("/posts/my");
  };

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (loading) {
    return (
      <div>
        <div className="d-flex align-items-center justify-content-around">
          <div>
            <h1 className="mt-4 mb-5">All Posts</h1>
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
            <h1 className="mt-4 mb-5">All Posts</h1>
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
                <button className="btn btn-primary" onClick={myPostsHandler}>
                  My Posts
                </button>
              </div>
            )}
          </div>
        </div>
        <div>
          {allPosts ? (
            allPosts.results.map((post) => (
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
export default Homepage;
