"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("NotToDoLists", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      list: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      startTime: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      endTime: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      time: {
        type: Sequelize.DECIMAL(10, 1),
      },
      startTime_feedback: {
        type: Sequelize.TIME,
      },
      endTime_feedback: {
        type: Sequelize.TIME,
      },
      time_feedback: {
        type: Sequelize.DECIMAL(10, 1),
      },
      theme: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "테마 없음",
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("NotToDoLists");
  },
};
