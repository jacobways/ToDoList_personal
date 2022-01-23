"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NotToDoList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NotToDoList.init(
    {
      userId: DataTypes.INTEGER,
      list: DataTypes.STRING,
      startTime: DataTypes.TIME,
      endTime: DataTypes.TIME,
      time: DataTypes.INTEGER,
      startTime_feedback: DataTypes.TIME,
      endTime_feedback: DataTypes.TIME,
      time_feedback: DataTypes.INTEGER,
      theme: {
        type: DataTypes.STRING,
        defaultValue: "테마 없음",
      },
      date: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "NotToDoList",
    }
  );
  return NotToDoList;
};
