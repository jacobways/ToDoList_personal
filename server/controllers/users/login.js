const jwt = require("jsonwebtoken");
const { User } = require("../../models");

module.exports = async (req, res) => {
  let userInfo = await User.findOne({
    where: { username: req.body.username, password: req.body.password },
  });

  if (!userInfo) {
    res.status(400).send({ data: null, message: "가입된 정보가 없습니다." });
  } else {
    // console.log(userInfo);
    const payload = {
      id: userInfo.id,
      question: userInfo.question,
      password: userInfo.password,
      username: userInfo.username,
      createdAt: userInfo.createdAt,
      updatedAt: userInfo.updatedAt,
    };
    const token = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "2h",
    });

    res
      .status(200)
      .cookie("token", token, {
        domain: "localhost",
        path: "/",
        sameSite: "none",
        secure: true,
        httpOnly: true,
      })
      .json({ data: { token }, message: "로그인에 성공하셨습니다." });

    // res.set("Set-Cookie", [`accessToken=${accessToken}`]);
    // res
    //   .status(200)
    //   .json({ data: { accessToken }, message: "로그인에 성공하셨습니다." });
  }
};
