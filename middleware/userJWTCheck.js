const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

async function userTokenCheck(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.decode(token);
      req.user = decoded;
      const result = await User.findById(decoded["_id"]);
      if (!result) {
        return res.status(403).send("User not found");
      }
      req.user = decoded;
      next();
    } catch (e) {
      return res.status(403).send("Unauthenticated User");
    }
  } else {
    return res.status(401).send("Access Denied. No token provided.");
  }
}

module.exports = {
  userTokenCheck: userTokenCheck,
};
