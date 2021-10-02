const jwt = require("jsonwebtoken");

const fs = require("fs");
const path = require("path");
const mainPath = require("../../file_extension");

const pathToPrivKey = path.join(mainPath, "server", "keys", "rsa_priv_key.pem");
const PRIV_KEY = fs.readFileSync(pathToPrivKey, "utf8");
console.log(PRIV_KEY);

const issueJwt = (userId) => {
  const options = {
    expiresIn: "1d",
    algorithm: "RS256",
  };

  const token = jwt.sign({ id: userId }, PRIV_KEY, options);

  return `Bearer ${token}`;
};

module.exports = issueJwt;
