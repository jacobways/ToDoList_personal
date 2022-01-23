const jwt = require("jsonwebtoken");
const { User } = require("../../models");

module.exports = async (req, res) => {
  let userInfo = await User.findOne({
    where: { username: req.body.username, question: req.body.question },
  });

  if (!userInfo) {
    res.status(404).send({ data: null, message: "가입된 정보가 없습니다." });
  } else {
    console.log(userInfo);

    const password = {
        password : userInfo.password,
        question : userInfo.question,
        username : userInfo.username,
    };

    res.set("Set-Cookie", [`password=${password}`]);
    res
      .status(200)
      .json({ data: {password}, message: "로그인에 성공하셨습니다." });
  }
};
