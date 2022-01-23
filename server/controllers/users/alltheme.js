const { Theme } = require("../../models");

module.exports = async (req, res) => {
  // 모든 유저 정보를 가져오기
  const { userId } = req.params;
  const allTheme = await Theme.findAll({ where: { userId: userId } });

  return res
    .status(200)
    .json({ message: "모든 테마 전달되었습니다", allTheme: allTheme });
};
