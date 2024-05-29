const express = require("express");
const app = express();
const { registrationRouter } = require("./ui/registration");
const { loginRouter } = require("./ui/login");
const {
  checkIsAdmin,
  checkTokenExist,
} = require("./ui/middleware/loginMiddleware");

if (!process.env.NODE_ENV === "dev") {
  process.env.SECRET_JWT = require("crypto").randomBytes(32).toString("hex");
} else {
  process.env.SECRET_JWT =
    "7106619a64f2ed649432455f15a00755b6356f97e5f92af64171c3ff771688ef";
}

app.use(express.json());

app.use("/api/v1/registration", registrationRouter);
app.use("/api/v1/login", loginRouter);

app.listen(5001, () => {
  console.log(`App listenling localhost:5001 / 127.0.0.1:5001`);
});
