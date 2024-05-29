const { validatePassword } = require("../infrastructure/PasswordHandleService");
const { findByUserId } = require("./registrationHandler");

const validateUser = async (command) => {
  const { userId, password } = command;
  const user = await findByUserId(userId);

  if (!user) {
    throw Error(`User: ${userId} not found.`);
  }

  const isPasswordValid = await validatePassword(password, user.hashPassword);

  if (!isPasswordValid) {
    throw Error(`Password mismatch for userId: ${userId}.`);
  }

  return { name: user.username, role: user.role, userId: user.id };
};

module.exports = {
  validateUser,
};
