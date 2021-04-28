import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSignOut } from "../../redux/actions/user-actions";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  // console.log(userInfo);
  let username = "";
  if (userInfo) username = userInfo.username;

  const loginLogoutHandler = (e) => {
    // console.log(e.target.innerHTML);
    if (e.target.innerHTML === "Login") history.push("/login");
    else if (e.target.innerHTML === "Logout") {
      let question = window.confirm("You sure to logout?");
      if (question) {
        dispatch(userSignOut());
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Posts
      </Link>

      <div>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              {username}
              <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item" onClick={(e) => loginLogoutHandler(e)}>
            <Link className="nav-link" to="/">
              {userInfo ? <span>Logout</span> : <span>Login</span>}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Header;
