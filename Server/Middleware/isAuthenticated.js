const catchAsync = require("../Utils/catchAsync");
const jwt = require("jsonwebtoken");
const config = require("../config");
module.exports = catchAsync(async (req, res, next) => {
  var auth = req.headers.authorization;

  if (auth === null || auth === undefined) {
    res.statusMessage = "Not Authenticated!";
    res.status(400).end();
    return;
  }
  try {
    const decodedToken = jwt.verify(auth.split(" ")[1], config.JWT_SECRET);
    req.body.token = decodedToken;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.statusMessage = "Not Authenticated!";
      res.status(401).send({ error });
    } else if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.NotBeforeError
    ) {
      res.statusMessage = "Not Authenticated!";
      res.status(401).send({ error });
    }
    return;
  }
  next();
});
