const { Theme } = require("../../models");
module.exports = async (req, res) => {
  const { userId, name, color } = req.body;

  const themeInfo = await Theme.findOne({
    where: { userId: userId, name: name },
  });
  if (!themeInfo) {
    Theme.create({
      userId: userId,
      name: name,
      color: color,
    });

    res.status(200).json({ message: "테마 생성에 성공하셨습니다." });
  } else {
    res.status(404).send("중복된 테마가 있습니다.");
  }
};
