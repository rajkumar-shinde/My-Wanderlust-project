const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const passportLocalMongoose = require("passport-local-mongoose");
const passportLocalMongoose =
  require("passport-local-mongoose").default ||
  require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});
userSchema.plugin(passportLocalMongoose, {
  usernameValidator: (username) => {
    return /^[a-zA-Z0-9_]{3,20}$/.test(username);
  },
  errorMessages: {
    MissingUsernameError: "Username is required.",
    IncorrectUsernameError:
      "Username must be 3-20 characters and contain only letters, numbers, and underscores.",
  },
});

module.exports = mongoose.model("User", userSchema);
