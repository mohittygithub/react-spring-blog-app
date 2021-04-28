import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { userSigninReducer } from "./reducers/user-reducers";
import {
  allPostsReducer,
  myPostsReducer,
  newPostReducer,
} from "./reducers/post-reducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  userSignup: {
    createdUser: localStorage.getItem("createdUser")
      ? JSON.parse(localStorage.getItem("createdUser"))
      : null,
  },
  getAllPosts: {
    allPosts: localStorage.getItem("allPosts")
      ? JSON.parse(localStorage.getItem("allPosts"))
      : null,
  },
  getMyPosts: {
    myAllPosts: localStorage.getItem("myPosts")
      ? JSON.parse(localStorage.getItem("myPosts"))
      : null,
  },
  postCreation: {
    postInfo: localStorage.getItem("postInfo")
      ? JSON.parse(localStorage.getItem("postInfo"))
      : null,
  },
};

const reducer = combineReducers({
  userSignin: userSigninReducer,
  getAllPosts: allPostsReducer,
  userSignup: userSigninReducer,
  postCreation: newPostReducer,
  getMyPosts: myPostsReducer,
});

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
