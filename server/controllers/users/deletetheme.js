const { Theme } = require("../../models");

module.exports = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    res.status(400).send("요청주신 정보가 없습니다.");
  } else {
    const findData = await Theme.findOne({ where: { name } });

    if (!findData) {
      res.status(404).send("Theme 정보가 없습니다.");
    } else {
      Theme.destroy({
        where: {
          name,
        },
      })
        .then((data) => {
          res.status(200).send("해당 테마를 정상적으로 삭제했습니다.");
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    }
  }
};
