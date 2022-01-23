const { Theme } = require("../../models");

module.exports = async (req, res) => {
  // 모든 유저 정보를 가져오기
  const { name } = req.params;
  const editTheme = await Theme.findOne({ where: { name: name } });

  return res
    .status(200)
    .json({ message: "선택한 테마가 전달되었습니다", editTheme: editTheme });
};
