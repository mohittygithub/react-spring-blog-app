import axios from "axios";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SIGNUP_FAILURE,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "../constants/user-constants";

const uri = process.env.REACT_APP_SERVER_URI;

export const userSignIn = (username, password) => async (dispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
  });

  try {
    const { data } = await axios.post(`${uri}/users/authenticate`, {
      username,
      password,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userSignUp = (name, username, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNUP_REQUEST,
  });

  try {
    const { data } = await axios.post(`${uri}/users/register`, {
      name,
      username,
      password,
    });
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    });
    localStorage.setItem("createdUser", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAILURE,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const userSignOut = () => async (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
  localStorage.removeItem("userInfo");
};
