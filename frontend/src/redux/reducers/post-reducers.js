import {
  MY_POSTS_FAILURE,
  MY_POSTS_REQUEST,
  MY_POSTS_SUCCESS,
  NEW_POST_FAILURE,
  NEW_POST_REQUEST,
  NEW_POST_SUCCESS,
  POST_DATA_FAILURE,
  POST_DATA_REQUEST,
  POST_DATA_SUCCESS,
} from "../constants/post-constants";

export const allPostsReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_DATA_REQUEST:
      return {
        loading: true,
      };
    case POST_DATA_SUCCESS:
      return {
        loading: false,
        allPosts: action.payload,
      };
    case POST_DATA_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const myPostsReducer = (state = {}, action) => {
  switch (action.type) {
    case MY_POSTS_REQUEST:
      return {
        loading: true,
      };
    case MY_POSTS_SUCCESS:
      return {
        loading: false,
        myAllPosts: action.payload,
      };
    case MY_POSTS_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const newPostReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_POST_REQUEST:
      return {
        loading: true,
      };
    case NEW_POST_SUCCESS:
      return {
        loading: false,
        postInfo: action.payload,
      };
    case NEW_POST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
