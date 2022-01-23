const { ToDoList } = require("../../models");
require("dotenv").config();
const CalculateTime = require("../CalculateTime");

module.exports = async (req, res) => {
  const {
    id,
    userId,
    list,
    startTime,
    endTime,
    startTime_feedback,
    endTime_feedback,
    theme,
    date,
  } = req.body;

  if (!id) {
    res.status(400).send("요청주신 정보가 없습니다.");
  } else {
    const findData = await ToDoList.findOne({ where: { id } });

    if (!findData) {
      res.status(404).send("To Do List 정보가 없습니다.");
    } else {
      let time = CalculateTime(startTime, endTime);
      let time_feedback = CalculateTime(startTime_feedback, endTime_feedback);

      ToDoList.update(
        {
          userId,
          list,
          startTime,
          endTime,
          time,
          startTime_feedback,
          endTime_feedback,
          time_feedback,
          theme,
          date,
        },
        {
          where: {
            id,
          },
        }
      )
        .then((data) => {
          res.status(200).send("updated");
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    }
  }
};
