require("dotenv/config")
const jwt = require("jsonwebtoken")
const Users = require("../models/users")


async function isAuthenticated(req, res, next) {

  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "Authorization header not found" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_value"
    );

    await Users.findOne({ user_name: decoded.userName })
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((error) => {
        return res
          .status(401)
          .json({ message: "User not found", error: error });
      });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = isAuthenticated;
