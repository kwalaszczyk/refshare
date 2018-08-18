const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    requird: true
  },
  email: {
    type: String,
    requird: true
  },
  password: {
    type: String,
    requird: true
  },
  picture: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  provider_id: {
    type: String
  },
  provider: {
    type: String
  }
});

module.exports = User = mongoose.model("users", UserSchema);
