const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Admin: {
      type: Number,
    },
    Editor: {
      type: Number,
    },
  },
});


module.exports = mongoose.model("User", UserSchema);