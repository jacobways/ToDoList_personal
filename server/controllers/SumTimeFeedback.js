const { ToDoList } = require("../models");
require("dotenv").config();
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  const { theme, userId } = req.query;

  if (!theme) {
    res.status(400).send("테마명이 없습니다");
  } else {
    const findData = await ToDoList.findOne({ where: { theme, userId } });

    if (!findData) {
      res.status(404).send("해당 테마명의 To Do List 정보가 없습니다.");
    } else {
      ToDoList.sum("time_feedback", {
        where: { theme: { [Op.eq]: theme }, userId: { [Op.eq]: userId } },
      })
        .then(data => {
          res.status(200).json({ message: "ok", data: data });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
