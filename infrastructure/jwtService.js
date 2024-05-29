const jwt = require("jsonwebtoken");

const generateToken = (userInfo) => {
  try {
    console.log({ generateToken: process.env.SECRET_JWT });
    return jwt.sign({ ...userInfo }, process.env.SECRET_JWT, {
      expiresIn: 3 * 60 * 60,
    });
  } catch (err) {
    throw err;
  }
};

const validateToken = async (jwtToken) => {
  try {
    console.log({ validateToken: process.env.SECRET_JWT });

    return jwt.verify(jwtToken, process.env.SECRET_JWT);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  generateToken,
  validateToken,
};
