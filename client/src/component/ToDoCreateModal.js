import axios from "axios";
import React, { useState, useEffect } from "react";
import "./CreateModal.css";

function ToDoCreateModal({ date, userId, changeListHandler }) {
  const [ToDoList, setToDoList] = useState("");
  const [ToDoStartTime, setToDoStartTime] = useState("00:00");
  const [ToDoEndTime, setToDoEndTime] = useState("00:00");
  const [ToDoThemeName, setToDoThemeName] = useState([]);
  const [TodoTheme, setTodoTheme] = useState("");

  const ToDoListHandler = e => {
    setToDoList(e.target.value);
  };

  const ToDoStartTimeHandler = e => {
    setToDoStartTime(e.target.value);
  };

  const ToDoEndTimeHandler = e => {
    setToDoEndTime(e.target.value);
  };

  const addToDoListHandler = e => {
    // create 요청 핸들러
    e.preventDefault();
    let data = {
      userId: userId,
      list: ToDoList,
      startTime: ToDoStartTime,
      endTime: ToDoEndTime,
      theme: TodoTheme,
      date: date,
    };
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/todo`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then(res => {
        changeListHandler();
      })
      .catch(err => {
        console.log(err);
      });

    // theme update- > todo id 연결 update 서버 api
  };

  // axios로 theme 불러와서 themename만 저장

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/allTheme/${userId}`).then(res => {
      let newNotToDoThemeName = [...ToDoThemeName];
      res.data.allTheme.forEach(theme => {
        newNotToDoThemeName.push(theme.name);
      });
      setToDoThemeName(newNotToDoThemeName);
    });
  }, []);

  const ThemeHandler = e => {
    e.preventDefault();
    setTodoTheme(e.target.value);
  };

  return (
    <>
      <div className="create-wrapper">
        <form>
          <label>LIST: </label>
          <input type="text" onChange={ToDoListHandler} placeholder="LIST" />
          <label>START TIME: </label>
          <input
            type="time"
            onChange={ToDoStartTimeHandler}
            placeholder="START TIME"
          />
          <label>END TIME: </label>
          <input
            type="time"
            onChange={ToDoEndTimeHandler}
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
            {ToDoThemeName &&
              ToDoThemeName.map((a, index) => (
                <option key={index} value={a}>
                  {a}
                </option>
              ))}
          </select>

          <button
            className="create-btn"
            type="submit"
            onClick={addToDoListHandler}
          >
            SUBMIT
          </button>
        </form>
      </div>
    </>
  );
}

export default ToDoCreateModal;
