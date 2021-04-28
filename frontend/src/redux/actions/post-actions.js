import axios from "axios";
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

const uri = process.env.REACT_APP_SERVER_URI;

export const getAllPosts = () => async (dispatch) => {
  dispatch({
    type: POST_DATA_REQUEST,
  });

  try {
    const { data } = await axios.get(`${uri}/posts`);
    //console.log("data=>", data);
    dispatch({
      type: POST_DATA_SUCCESS,
      payload: data,
    });
    localStorage.setItem("allPosts", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: POST_DATA_FAILURE,
      payload:
        error.resopnse && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMyAllPosts = (username, jwt) => async (dispatch) => {
  // console.log("jwt => ", jwt);
  dispatch({
    type: MY_POSTS_REQUEST,
  });

  try {
    const { data } = await axios.post(
      `${uri}/posts/my`,
      { username },
      { headers: { Authorization: "Bearer " + jwt } }
    );
    dispatch({
      type: MY_POSTS_SUCCESS,
      payload: data,
    });
    localStorage.setItem("myPosts", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: MY_POSTS_FAILURE,
      payload:
        error.response && error.response.error.message
          ? error.response.error.message
          : error.message,
    });
  }
};

export const createPost = (title, description, jwt) => async (dispatch) => {
  dispatch({
    type: NEW_POST_REQUEST,
  });

  try {
    const { data } = await axios.post(
      `${uri}/posts`,
      { title, description },
      { headers: { Authorization: "Bearer " + jwt } }
    );
    dispatch({
      type: NEW_POST_SUCCESS,
      payload: data,
    });
    localStorage.setItem("postInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: NEW_POST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
