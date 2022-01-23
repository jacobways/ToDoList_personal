const { User } = require("../../models");

module.exports = async (req, res) => {
  // 모든 유저 정보를 가져오기
  const allUser = await User.findAll();

  return res
    .status(200)
    .json({ message: "모든 유저수가 전달되었습니다", allUser: allUser.length });
};
