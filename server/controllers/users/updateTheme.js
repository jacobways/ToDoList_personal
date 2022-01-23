const { Theme } = require("../../models");

module.exports = async (req, res) => {
  const { defaultname, editname, editcolor } = req.body;

  if (!defaultname) {
    res.status(400).send("요청주신 정보가 없습니다.");
  } else {
    const findData = await Theme.findOne({ where: { name: defaultname } });

    if (!findData) {
      res.status(404).send("Theme 정보가 없습니다.");
    } else {
      Theme.update(
        { name: editname, color: editcolor },
        {
          where: {
            name: defaultname,
          },
        }
      )
        .then((data) => {
          res.status(200).send("updated");
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    }
  }
};
