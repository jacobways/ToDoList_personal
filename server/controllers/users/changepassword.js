const { User } = require("../../models");

module.exports = async (req, res) => {
  // Change everyone without a last name to "Doe"
  await User.update(
    { password: req.body.password },
    {
      where: {
        id: req.body.userId,
      },
    }
  );
  return res.status(200).json({ message: "비밀번호 변경에 성공했습니다." });
};
