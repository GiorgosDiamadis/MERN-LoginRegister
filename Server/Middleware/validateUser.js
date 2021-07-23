const catchAsync = require("../Utils/catchAsync");
const { body, checkSchema } = require("express-validator");
const User = require("../Models/user");

module.exports.loginValidation = checkSchema({
  username: {
    in: ["body"],
    isString: true,
    isLength: {
      options: { min: 1 },
      errorMessage: "Username is empty!",
    },
  },
  password: {
    in: ["body"],
    isLength: {
      errorMessage: "Password must be between 12 to 60 characters long",
      options: { min: 12, max: 60 },
    },
  },
});

module.exports.registerValidation = checkSchema({
  username: {
    in: ["body"],
    isString: true,
    isLength: {
      options: { min: 1 },
      errorMessage: "Username is empty!",
    },

    custom: {
      options: async (value) => {
        const user = await User.findOne({ username: value });
        if (user === null || user == undefined) {
          return true;
        }
        return false;
      },
      errorMessage: "Username already exists!",
    },
  },
  password: {
    in: ["body"],
    isLength: {
      errorMessage: "Password must be between 12 to 60 characters long",
      options: { min: 12, max: 60 },
    },
  },
  email: {
    in: ["body"],
    isEmail: true,
    errorMessage: "Not valid email",
  },
  confirmPassword: {
    in: ["body"],
    custom: {
      options: (
        value,
        {
          req: {
            body: { password },
          },
        }
      ) => {
        return value === password;
      },
      errorMessage: "Passwords don't match!",
    },
  },
});
