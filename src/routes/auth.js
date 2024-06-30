const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const Users = require("../models/users");
const router = express.Router();
const { generateToken } = require("../helpers/tokenGenerator");

router.post("/login-with-google", async (req, res) => {
  const authToken = req.body?.token;

  if (authToken) {
    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

      const ticket = await client.verifyIdToken({
        idToken: authToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (payload && payload.email) {
        let user = await Users.findOne({ email: payload.email });
        if (!user) {
          user = await Users.create({
            name: payload.name,
            email: payload.email,
          });
        }

        const token = generateToken(payload.email);
        res.send({ token, user });
      } else {
        console.error("cannot fetch payload!!");
        res.status(401).json({ success: false, error: "Invalid token" });
      }
    } catch (error) {
      console.error("Error verifying Google Sign-In token:", error.message);
      res.status(401).json({ success: false, error: "Invalid token" });
    }
  } else {
    res.status(401).send("Invalid token");
  }
});

module.exports = router;
