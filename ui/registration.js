const express = require("express");
const { saveUser, updateUser } = require("../application/registrationHandler");
const {
  checkTokenExist,
  checkIsAdmin,
} = require("./middleware/loginMiddleware");
const registrationRouter = express.Router();

registrationRouter
  .route("/")
  .post(checkTokenExist, checkIsAdmin, async (req, res) => {
    await saveUser(req.body)
      .then((user) => {
        res.status(201).json({
          message: "User successfully created. Use given userId for login.",
          userId: user.id,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: "Failed to create a user",
          errorMessage: err.message,
        });
      });
  })
  .put(checkTokenExist, checkIsAdmin, async (req, res) => {
    await updateUser(req.body)
      .then((user) => {
        res.status(201).json({
          message: "User successfully updated.",
          userId: user.id,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: "Failed to update a user",
          errorMessage: err.message,
        });
      });
  });

module.exports = {
  registrationRouter,
};
