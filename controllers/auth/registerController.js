const User = require("../../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  console.log(req.body)
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "username and password are required" });

  const duplicate = await User.findOne({ username: user }).exec();
  console.log(duplicate);
  if (duplicate) return res.sendStatus(409);

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // create and store
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });
    res
      .status(201)
      .json({ success: `new user with username: ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
