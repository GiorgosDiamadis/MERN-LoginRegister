const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

userSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(12, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = async function comparePassword(password) {
  await bcrypt.compare(password, this.password, (err, isMatch) => {
    return isMatch;
  });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
