const jwt = require("jsonwebtoken");
const config = require("../config");
module.exports = (user_id, username, email) => {
  const key = jwt.sign({ user_id, username, email }, config.JWT_SECRET, {
    expiresIn: "1h",
  });
  return key;
};
