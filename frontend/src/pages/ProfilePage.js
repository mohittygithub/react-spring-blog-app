import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState({});
  const { userInfo } = useSelector((state) => state.userSignin);
  const { username, jwt } = userInfo;
  //   console.log(username);

  useEffect(() => {
    const uri = process.env.REACT_APP_SERVER_URI;
    const callout = async () => {
      const data = await axios.get(`${uri}/users/${username}`, {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      });
      //   console.log("data => ", data.data.results[0]);
      setUserDetails(data.data.results[0]);
    };
    callout();
  }, [jwt, username]);
  return (
    <div>
      <div className="jumbotron container mt-5 d-flex align-items-center justify-content-around">
        <div>
          <img
            src=""
            alt="profile"
            className="border border-primary img-thumbnail"
          />
        </div>
        <div>
          <p>Id: {userDetails.id}</p>
          <p>Name: {userDetails.name}</p>
          <p>Email: {userDetails.username}</p>
          <p>Profile Created On: {userDetails.created}</p>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
