import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const BarChart = ({ UsersId, ToDoList, Token }) => {
  const [AccessToken, setAccessToken] = useState(Token);
  const [userId, setUserId] = useState(UsersId);

  // userId로 테마명을 리스트를 배열에 담기 : labels
  // 테마명에 해당하는 색깔을 배열에 담기 : borderColor + 연하게 해서 배열에 담기 : backgroundColor
  // 테마명에 해당하는 시간 합계를 배열에 담기 : data

  // planned Time 관련 내용
  const [planLabels, setPlanLabels] = useState([]);
  const [planBackgroundColor, setPlanBackgroundColor] = useState([]);
  const [planTimeData, setPlanTimeData] = useState([]);

  // feedback Time 관련 애용
  const [labels, setLabels] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState([]);
  const [timeData, setTimeData] = useState([]);

  useEffect(() => {
    setAccessToken(Token);
    // post 요청해서 로그인한 id,pw 보여주기 -> NavBar에 ~님 환영합니다
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
        setUserId(res.data.userInfo.id);
        // console.log(res);
      })
      .then(() => {
        // planned time 가져오기
        axios.get(`${process.env.REACT_APP_SERVER_URL}/allTheme/${userId}`).then(res => {
          console.log("userId", userId);
          console.log("res.data.allTheme", res.data.allTheme);

          let newLabels = [];
          let newBackgroundColors = [];
          // let newTimeData = []

          console.log("res.data.allTheme", res.data.allTheme);

          for (let i = 0; i < res.data.allTheme.length; i++) {
            let themeName = res.data.allTheme[i].name;
            let themeColor = res.data.allTheme[i].color;
            let lightColor = themeColor[0] + "33" + themeColor.slice(1, 7);
            newLabels.push(themeName);
            newBackgroundColors.push(lightColor);

            axios
              .get(
                `${process.env.REACT_APP_SERVER_URL}/plannedTime`,
                { params: { userId: userId, theme: themeName } },
                { withCredentials: true }
              )
              .then(res => {
                console.log(res);
                setPlanTimeData([...planTimeData, res.data.data]);
              })
              .catch(err => {
                console.log(err);
              });
          }
          setPlanLabels(newLabels);
          setPlanBackgroundColor(newBackgroundColors);
          // setPlanTimeData(newTimeData)
        });

        // feedback time 가져오기
        axios.get(`${process.env.REACT_APP_SERVER_URL}/allTheme/${userId}`).then(res => {
          console.log("userId", userId);
          console.log("res.data.allTheme", res.data.allTheme);

          let newLabels = [];
          let newBackgroundColors = [];
          // let newTimeData = []

          console.log("res.data.allTheme", res.data.allTheme);

          for (let i = 0; i < res.data.allTheme.length; i++) {
            let themeName = res.data.allTheme[i].name;
            let themeColor = res.data.allTheme[i].color;
            newLabels.push(themeName);
            newBackgroundColors.push(themeColor);

            axios
              .get(
                `${process.env.REACT_APP_SERVER_URL}/time`,
                { params: { userId: userId, theme: themeName } },
                { withCredentials: true }
              )
              .then(res => {
                console.log("res.data.data", res.data.data);
                setTimeData([...timeData, res.data.data]);
              })
              .catch(err => {
                console.log(err);
              });
          }
          console.log("newTimeData");
          setLabels(newLabels);
          setBackgroundColor(newBackgroundColors);
          // setTimeData(newTimeData, 'newTimeData')
        });
      });
  }, [UsersId]);

  return (
    <div>
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: "Planned",
              data: planTimeData,
              backgroundColor: planBackgroundColor,
              borderWidth: 1,
            },
            {
              label: "Feedback",
              data: timeData,
              backgroundColor: backgroundColor,
              borderWidth: 1,
            },
          ],
        }}
        height={400}
        weight={600}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default BarChart;
