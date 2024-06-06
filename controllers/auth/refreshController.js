const User = require("../../model/User");

const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) return res.sendStatus(401);

  const refreshToken = cookie.refreshToken;

  const foundUser = await User.findOne({ refreshToken }).exec();

  // unauthorised
  if (!foundUser) return res.sendStatus(403);

  // evaluating JWT
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err || foundUser.username !== user.username) return res.sendStatus(403);
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      { UserInfo: { username: foundUser.username, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ user: foundUser.username, roles, accessToken });
  });
};

module.exports = { handleRefreshToken };
