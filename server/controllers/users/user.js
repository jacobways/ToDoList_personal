const { User } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  // 토큰 보내서 post 요청
  // jwt verify로 인증하고 그 data를 다시 보내주기
  let token = req.cookies.token;
  // console.log(req.cookies);

  if (!token) {
    res
      .status(400)
      .send({ data: null, message: "유저 정보를 가져올수 없습니다." });
  } else {
    jwt.verify(token, process.env.ACCESS_SECRET, async (err, decoded) => {
      const userDb = await User.findOne({ where: { id: decoded.id } });
      //   console.log(userDb);
      let userInfo = {
        id: userDb.id,
        username: userDb.username,
        question: userDb.question,
        password: userDb.password,
      };
      //   console.log(userInfo);

      res.status(200).send({
        userInfo: userInfo,
        message: "유저 정보가 정상적으로 전달 되었습니다.",
      });
    });
  }
};
