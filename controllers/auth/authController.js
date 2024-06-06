const User = require("../../model/User");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "username and password are required" });

  const foundUser = await User.findOne({ username: user }).exec();

  // unauthorised
  if (!foundUser) return res.sendStatus(401);

  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    const roles = Object.values(foundUser.roles);

    const accessToken = jwt.sign(
      { UserInfo: { username: foundUser.username, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    //saving refresh token to the user to logout in future
    // const otherUsers = usersDB.users.filter(
    //   (person) => person.username !== foundUser.username
    // );
    // const updatedUser = { ...foundUser, refreshToken };
    // usersDB.setUsers([...otherUsers, updatedUser]);
    // await fsPromises.writeFile(
    //   path.join(__dirname, "..", "..", "model", "users.json"),
    //   JSON.stringify(usersDB.users, null, 2)
    // );

    foundUser.refreshToken = refreshToken;
    const updatedUser = await foundUser.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.json({
      user: updatedUser.username,
      accessToken,
      roles: Object.values(updatedUser.roles),
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
