import axios from "axios";
import React, { useState, useEffect } from "react";
import "./CreateModal.css";

function NotToDoCreateModal({ date, userId, changeListHandler }) {
  const [NotToDoList, setNotToDoList] = useState("");
  const [NotToDoStartTime, setNotToDoStartTime] = useState("00:00");
  const [NotToDoEndTime, setNotToDoEndTime] = useState("00:00");
  const [NotToDoTheme, setNotTodoTheme] = useState([]);
  const [NotToDoThemeName, setNotToDoThemeName] = useState("");

  const NotToDoListHandler = e => {
    setNotToDoList(e.target.value);
  };

  const NotToDoStartTimeHandler = e => {
    setNotToDoStartTime(e.target.value);
  };

  const NotToDoEndTimeHandler = e => {
    setNotToDoEndTime(e.target.value);
  };

  const NotaddToDoListHandler = e => {
    e.preventDefault();
    let data = {
      userId: userId,
      list: NotToDoList,
      startTime: NotToDoStartTime,
      endTime: NotToDoEndTime,
      theme: NotToDoTheme,
      date: date,
    };
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/nottodo`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then(res => {
        changeListHandler();
      })
      .catch(err => {
        console.log(err);
      });
  };
  const ThemeHandler = e => {
    e.preventDefault();
    setNotTodoTheme(e.target.value);
  };

  // axios로 theme 불러와서 themename만 저장

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/allTheme/${userId}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then(res => {
        let newNotToDoThemeName = [...NotToDoThemeName];
        res.data.allTheme.forEach(theme => {
          newNotToDoThemeName.push(theme.name);
        });
        setNotToDoThemeName(newNotToDoThemeName);
      });
  }, []);

  return (
    <>
      <div className="create-wrapper">
        <form>
          <label>LIST: </label>
          <input type="text" onChange={NotToDoListHandler} placeholder="LIST" />
          <label>START TIME: </label>
          <input
            type="time"
            onChange={NotToDoStartTimeHandler}
            placeholder="START TIME"
          />
          <label>END TIME: </label>
          <input
            type="time"
            onChange={NotToDoEndTimeHandler}
            placeholder="END TIME"
          />
          <label>THEME: </label>
          <select
            className="create-select"
            name="theme"
            id="theme-select"
            onChange={ThemeHandler}
          >
            <option value="">--Please choose an THEME--</option>
            {NotToDoThemeName &&
              NotToDoThemeName.map((a, index) => (
                <option key={index} value={a}>
                  {a}
                </option>
              ))}
          </select>
          <button
            className="create-btn"
            type="submit"
            onClick={NotaddToDoListHandler}
          >
            SUBMIT
          </button>
        </form>
      </div>
    </>
  );
}

export default NotToDoCreateModal;
