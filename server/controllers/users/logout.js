const jwt = require("jsonwebtoken");
const { User } = require("../../models");

module.exports = (req, res) => {
  if (!req.cookie) {
    return res
      .cookie("token", "", {
        domain: "localhost",
        path: "/",
        sameSite: "none",
        secure: true,
        httpOnly: true,
      })
      .send("로그아웃 성공");
  }
};
