const jwt = require("jsonwebtoken")

function generateToken(email) {
  const payload = { email };
  const options = {
    expiresIn: "2d",
  };

  return jwt.sign(payload, process.env.JWT_SECRET || "default_value", options);
}

module.exports = { generateToken };
