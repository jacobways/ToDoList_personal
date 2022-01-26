import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import BarChart from "../component/BarChart";

function Chart({ UserId, ToDoList, AccessToken }) {
  const [Labels, setLabels] = useState([]);
  const [Color, setColor] = useState([]);
  const [timeData, setTimeData] = useState([]); // 추가한 부분
  const [Token, setToken] = useState(AccessToken);
  const [UsersId, setUsersId] = useState(UserId);

  useEffect(() => {
    setToken(AccessToken);
    // post 요청해서 로그인한 id,pw 보여주기 -> NavBar에 ~님 환영합니다
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/user`,
        {
          headers: {
            Cookie: `token=${Token}`,
          },
        },
        { withCredentials: true }
      )
      .then(res => {
        setUsersId(res.data.userInfo.id);
      });
  }, []);

  useEffect(() => {
    // Theme name, Color 가져오기
    if (UserId !== 0) {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/allTheme/${UsersId}`).then(res => {
        let newLabels = [];
        let newColors = [];
        let newDatas = []; // 추가한 내용

        for (let i = 0; i < res.data.allTheme.length; i++) {
          newLabels.push(res.data.allTheme[i].name);
          newColors.push(res.data.allTheme[i].color);

          let theme = res.data.allTheme[i].name;

          // 서버 요청
          axios
            .get(
              `${process.env.REACT_APP_SERVER_URL}/time`,
              { params: { userId: UsersId, theme: theme } },
              { withCredentials: true }
            )
            .then(res => {
              setTimeData([...timeData, res.data.data]); // 이걸로 수정
              // newDatas.push(res.data.data) // 추가한 부분
            })
            .catch(err => {
              console.log(err);
            });
        }
        setLabels(newLabels);
        setColor(newColors);
        // setTimeData(newDatas)  // 추가한 부분
      });
    }

    // Calculate 시간 가져오기
  }, [UserId]);

  const data = {
    labels: Labels,
    datasets: [
      {
        data: timeData,
        backgroundColor: Color,
        hoverBackgroundColor: Color,
      },
    ],
  };

  return (
    <div
      style={{
        width: "40rem",
        height: "40rem",
        // display:'flex'
      }}
    >
      <h2>시간 사용 기록</h2>
      <Pie data={data} />
      <br></br>
      <h2>계획 대비 시간 사용</h2>
      <BarChart UsersId={UsersId} Token={Token} />
    </div>
  );
}
export default Chart;
