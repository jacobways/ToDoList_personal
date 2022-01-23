const jwt = require("jsonwebtoken");
const { User } = require("../../models");
module.exports = async (req, res) => {
  const userInfo = await User.findOne({
    where: { username: req.body.username },
  });
  if (!userInfo) {
    User.create({
      password: req.body.password,
      username: req.body.username,
      question: req.body.question,
    });

    res.status(200).json({ message: "회원가입에 성공하셨습니다." });
  } else {
    res.status(404).send("중복된 아이디가 있습니다.");
  }
};
