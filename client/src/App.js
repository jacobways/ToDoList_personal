import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ShowList from "./pages/ShowList";
import WriteList from "./pages/WriteList";
import LandingPage from "./component/LandingPage";
import Login from "./component/Login";
import Register from "./component/Register";
import ForgotPage from "./component/ForgotPage";
import MyPage from "./component/MyPage";
import NavBar from "./component/NavBar";
import axios from "axios";
import Chart from "./pages/Chart";

function App() {
  const [AccessToken, setAccessToken] = useState("");
  const [ToDoList, setToDoList] = useState(null); // [객체, 객체, 객체, ...]
  const [NotToDoList, setNotToDoList] = useState(null);
  const [date, setDate] = useState(getToday(new Date()));
  const [UserId, setUserId] = useState(1);

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
        // id 저장하고, 그 id로 다시 todo list post 요청

        setUserId(res.data.userInfo.id);
      });
  }, [AccessToken]);

  const ToDoListHandler = (id) => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/todo`,
        { params: { userId: id, date: date } },
        { withCredentials: true }
      )
      .then((res) => {
        setToDoList(res.data.data);
      })
      .catch((err) => {
        setToDoList(null);
      });
  };
  const NotToDoListHandler = (id) => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/nottodo`,
        { params: { userId: id, date: date } },
        { withCredentials: true }
      )
      .then((res) => {
        setNotToDoList(res.data.data);
      })
      .catch((err) => {
        setNotToDoList(null);
      });
  };
  function getToday(date) {
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  }

  function TokenSave(token) {
    setAccessToken(token);
  }
  return (
    <BrowserRouter>
      <Route exact path="/">
        <NavBar AccessToken={AccessToken} />
        <LandingPage AccessToken={AccessToken} />
      </Route>
      <Route exact path="/login">
        <Login TokenSave={TokenSave} />
      </Route>
      <Route exact path="/forgotpage">
        <ForgotPage />
      </Route>
      <Route exact path="/showlist">
        <NavBar AccessToken={AccessToken} />

        <ShowList
          AccessToken={AccessToken}
          UserId={UserId}
          ToDoList={ToDoList}
          NotToDoList={NotToDoList}
          ToDoListHandler={ToDoListHandler}
          NotToDoListHandler={NotToDoListHandler}
        />
      </Route>
      <Route exact path="/register" component={Register} />
      <Route exact path="/mypage">
        <NavBar AccessToken={AccessToken} />

        <MyPage UserId={UserId} AccessToken={AccessToken} />
      </Route>
      <Route exact path="/list">
        <NavBar AccessToken={AccessToken} />

        <WriteList
          AccessToken={AccessToken}
          UserId={UserId}
          ToDoList={ToDoList}
          NotToDoList={NotToDoList}
          ToDoListHandler={ToDoListHandler}
          NotToDoListHandler={NotToDoListHandler}
          date={date}
          setDate={setDate}
        />
      </Route>
      <Route exact path="/chart">
        <Chart UserId={UserId} ToDoList={ToDoList} />
      </Route>
    </BrowserRouter>
  );
}

export default App;
