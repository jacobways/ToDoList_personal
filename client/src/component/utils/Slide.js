import React, { useState, useEffect } from "react";
import "./Slide.css";

export default function Slide({ id }) {
  const username = ["김명현", "홍민혁", "김지윤", "장동혁"];
  const userPosition = ["Front-End", "Front-End", "Back-End", "Back-End"];
  const userOneWord = ["SBS 화이팅~"];

  const [UserName, setUserName] = useState(username);
  const [UserPosition, setUserPosition] = useState(userPosition);

  useEffect(() => {
    setUserName(username[id - 1]);
    setUserPosition(userPosition[id - 1]);
  }, [id]);

  return (
    <>
      <div className="slide-card">
        <div className="slide-additional">
          <div className="slide-user-card">
            <div className="slider-level slider-center">팀원 명 : {UserName}</div>
          </div>
        </div>

        <div className="slider-general">
          <h1>{UserName}</h1>
          <p>팀원 한마디 : {userOneWord[0]}</p>
          <span className="slider-more">팀원 Position : {UserPosition}</span>
        </div>
      </div>
  </>
  );
}
