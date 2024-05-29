const { saveFile, fetchFile } = require("../infrastructure/FileSystemService");
const { randomUUID } = require("crypto");
const { convertToCypher } = require("../infrastructure/PasswordHandleService");

const fileNames = {
  user: "users.json",
};

const saveUser = async (command) => {
  const { username, password, role } = command;
  let existingUser = await findByUserName(username);

  if (existingUser) {
    throw Error(
      `User ${username} already exists. This is the userId: ${existingUser.id}.`
    );
  }

  const encryptedPassword = await convertToCypher(password);
  let user = {
    username,
    hashPassword: encryptedPassword,
    role,
    id: `${role}_${randomUUID().slice(0, 5)}`,
  };

  await saveFile(fileNames["user"], [...(await findUsers()), user]);

  return user;
};

const findByUserName = async (name) => {
  let users = JSON.parse(await fetchFile(fileNames["user"]));
  return users.find((user) => user.username === name);
};

const findUsers = async () => {
  return JSON.parse(await fetchFile(fileNames["user"]));
};

const updateUser = async (command) => {
  const { username, role } = command;
  let existingUser = await findByUserName(username);

  if (!existingUser) {
    throw Error(`User ${username} not found.`);
  }

  let user = {
    ...existingUser,
    username,
    role,
  };

  const otherUsers = await findUsers().then((data) => {
    return data.filter((i) => i.username !== username);
  });

  await saveFile(fileNames["user"], [...otherUsers, user]);

  return user;
};

const findByUserId = async (userId) => {
  let users = JSON.parse(await fetchFile(fileNames["user"]));
  return users.find((user) => user.id === userId);
};

module.exports = {
  saveUser,
  updateUser,
  findByUserId,
};
