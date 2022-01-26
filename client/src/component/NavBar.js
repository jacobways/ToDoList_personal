import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./NavBar.css";
import axios from "axios";

function NavBar({ AccessToken }) {
  const [isLogin, setisLogin] = useState(false);
  const [Token, setToken] = useState(AccessToken);
  const [Login, setLogin] = useState("login");
  let history = useHistory();

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/user`,
        {
          headers: {
            Cookie: `token=${AccessToken}`,
          },
        },
        { withCredentials: true }
      )
      .then((res) => {
        setLogin("logout");
        setisLogin(true);
        // id 저장하고, 그 id로 다시 todo list post 요청
      });
  }, []);

  // const tokenHandler = () => {
  //   if (Token !== "") {
  //     setisLogin(!isLogin);
  //     setLogin("logout");
  //   } else {
  //     setisLogin(isLogin);
  //   }
  // };

  const LogOutHandler = (e) => {
    e.preventDefault();
    if (Login === "login") {
      history.push("/login");
    } else if (Login === "logout") {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/logout`,
          {
            headers: {
              Cookie: "",
            },
          },
          { withCredentials: true }
        )
        .then((res) => {
          setisLogin(!isLogin);
          setLogin("login");
        });
      // history.push("/");
      window.location.replace("/");
    }

  };

  return (
    <nav className="navigation navBar-nav">
      <ul className="menu navBar-menu">
        <img src="/a.png" width="50px" />
        <li className="li navBar-li">
          <Link to="/showlist">
            <svg className="home" width="30px" height="30px"></svg>
            <span title="home">Show List</span>
          </Link>
        </li>
        <li>
          <Link to="/list">
            <svg className="home" width="30px" height="30px"></svg>
            <span title="home">List</span>
          </Link>
        </li>
        <Link to="/mypage">
          <svg className="mypage" width="30px" height="30px"></svg>
          <span title="my page">my page</span>
        </Link>
        <li onClick={LogOutHandler}>
          <Link to="/">
            <svg className="home" width="30px" height="30px"></svg>
            <span title="home">{Login}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
