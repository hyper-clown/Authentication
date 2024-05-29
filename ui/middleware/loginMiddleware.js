const { validateToken } = require("../../infrastructure/jwtService");

const checkIsDeveloper = async (req, res, next) => {
  const { token } = req.headers;

  const userInfo = await validateToken(token);

  if (userInfo.role === "developer") {
    return res.status(401).json({ message: "User not authorized." });
  }

  next();
};

const checkIsAdmin = async (req, res, next) => {
  const { token } = req.headers;

  const userInfo = await validateToken(token);

  if (userInfo.role === "admin") {
    return res.status(401).json({ message: "User not authorized." });
  }

  next();
};

const checkTokenExist = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res
      .status(403)
      .json({ message: "Access token missing in request header" });
  }
  next();
};

module.exports = {
  checkIsAdmin,
  checkIsDeveloper,
  checkTokenExist,
};
