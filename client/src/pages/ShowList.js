import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import "./ShowList.css";

const Container = styled.div`
  color: black;
  text-align: center;
  height: 40rem;
  margin: 20px auto;
`;

export default function ShowList({
  ToDoList,
  NotToDoList,
  ToDoListHandler,
  NotToDoListHandler,
  UserId,
  date,
  AccessToken,
}) {
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
      .then(res => {
        ToDoListHandler(res.data.userInfo.id);
        NotToDoListHandler(res.data.userInfo.id);
        // id 저장하고, 그 id로 다시 todo list post 요청
      });
  }, []);

  function simpleTime(time) {
    //시-분-초 형태로 된 시간 데이터를 시-분으로 간단히 변경하기 위한 함수
    if (!time) return time;
    return time[0] + time[1] + time[2] + time[3] + time[4];
  }

  return (
    <>
      {ToDoList || NotToDoList ? (
        <div className="showlist-contanier">
          <div className="showlist-box">
            {ToDoList ? (
              <div className="app-container">
                <div className="app-content">
                  <div className="projects-section-header">
                    <span>TO DO LIST</span>
                  </div>
                  <div className="projects-section">
                    {ToDoList.map(todo => {
                      return (
                        <div key={todo.id} className="projects-boxes">
                          <div className="project-box-wrapper">
                            <div
                              className="project-box"
                              style={{ backgroundColor: "#fee4cd" }}
                            >
                              <div className="project-box-header">
                                <span>{date}</span>
                              </div>
                              <div className="project-box-content-header">
                                <p className="box-content-header">
                                  {todo.list}
                                </p>
                                <p className="box-content-subheader">
                                  {simpleTime(todo.startTime)}~
                                  {simpleTime(todo.endTime)}
                                </p>
                                <p className="box-content-subheader">
                                  {todo.theme}
                                </p>
                              </div>
                              <div className="project-box-footer">
                                <div
                                  className="days-left"
                                  style={{ color: "#ff942e" }}
                                >
                                  2 Days Left
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : null}
            {NotToDoList ? (
              <div className="app-container">
                <div className="app-content">
                  <div className="projects-section-header">
                    <span>NOT TO DO LIST</span>
                  </div>
                  <div className="projects-section">
                    {NotToDoList.map(nottodo => {
                      return (
                        <div key={nottodo.id} className="projects-boxes">
                          <div className="project-box-wrapper">
                            <div
                              className="project-box"
                              style={{ backgroundColor: "#fee4cd" }}
                            >
                              <div className="project-box-header">
                                <span>{date}</span>
                              </div>
                              <div className="project-box-content-header">
                                <p className="box-content-header">
                                  {nottodo.list}
                                </p>
                                <p className="box-content-subheader">
                                  {simpleTime(nottodo.startTime)}~
                                  {simpleTime(nottodo.endTime)}
                                </p>
                                <p className="box-content-subheader">
                                  {nottodo.theme}
                                </p>
                              </div>
                              <div className="project-box-footer">
                                <div
                                  className="days-left"
                                  style={{ color: "#ff942e" }}
                                >
                                  2 Days Left
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="showlist-null-contanier">
          <h2 className="showlist-null-h2">
            <Link to="/list">TO DO LIST 작성하러 가기</Link>
          </h2>
        </div>
      )}
    </>
  );
}
