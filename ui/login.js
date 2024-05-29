const express = require("express");
const { validateUser } = require("../application/loginHandler");
const { generateToken } = require("../infrastructure/jwtService");
const loginRouter = express.Router();

loginRouter.route("/").post(async (req, res) => {
  await validateUser(req.body)
    .then((userInfo) => {
      const jwtToken = generateToken(userInfo);
      return res
        .status(200)
        .json({ message: "User login valid", accessToken: jwtToken, userInfo });
    })
    .catch((err) => {
      return res
        .status(401)
        .json({ message: "User login invalid", errorMessage: err.message });
    });
});

module.exports = {
  loginRouter,
};
