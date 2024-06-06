const User = require("../../model/User");

const handleLogout = async (req, res) => {
  try {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
      console.log("No refreshToken cookie found.");
      return res.sendStatus(204); // no content
    }

    const refreshToken = cookie.refreshToken;

    // if refresh token found in the usersDB?
    const foundUser = await User.findOne({ refreshToken }).exec();

    // unauthorized
    if (!foundUser) {
      console.log("Refresh token not found in usersDB.");
      res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204); // no content
    }

    // remove refresh token from the user
    foundUser.refreshToken = "";
    const result = await foundUser.save();

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    console.log("User logged out and refreshToken cleared.");
    res.sendStatus(204); // no content
  } catch (error) {
    console.error("Error during logout:", error);
    res.sendStatus(500); // internal server error
  }
};

module.exports = { handleLogout };
