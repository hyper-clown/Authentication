const bcryptjs = require("bcryptjs");

const convertToCypher = async (normalText) => {
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(normalText, salt);

  return hash;
};

const validatePassword = async (password, cypherText) => {
  return bcryptjs.compare(password, cypherText);
};

module.exports = {
  convertToCypher,
  validatePassword,
};
