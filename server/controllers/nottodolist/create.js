const { NotToDoList } = require("../../models");
require("dotenv").config();

module.exports = (req, res) => {
  // 필수 항목 : id, userId, list, planned_time, createdAt
  // 필수 항목 아님 : Theme, time, checkBox, updatedAt
  // 나눠야할 필드 : 시간 & 시계의 시각
  const {
    userId,
    list,
    startTime,
    endTime,
    startTime_feedback,
    endTime_feedback,
    theme,
    date,
  } = req.body;

  // 핋수 항목이 입력이 안 되어 있으면 거부하는 걸로 (물론 프론트엔드에서도 이 기능 필요)
  if (!userId && !list && !startTime && !endTime && !date) {
    res.status(400).send("데이터가 불충분합니다.");
  } else {
    // 그게 아니면 데이터 저장하기
    NotToDoList.create({
      userId,
      list,
      startTime,
      endTime,
      startTime_feedback,
      endTime_feedback,
      theme,
      date,
    })
      .then(data => {
        res.status(201).send("Created");
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  }
};
