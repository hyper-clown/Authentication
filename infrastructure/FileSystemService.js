const fs = require("fs");

const saveFile = async (fileName, data) => {
  fs.writeFileSync(`${__dirname}/data/${fileName}`, JSON.stringify(data));
};

const fetchFile = async (fileName) => {
  return fs.readFileSync(`${__dirname}/data/${fileName}`, "utf-8");
};

module.exports = {
  saveFile,
  fetchFile,
};
