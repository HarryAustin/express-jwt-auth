const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const issueJwt = (userId) => {
  const options = {
    expiresIn: "1d",
  };

  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return `Bearer ${token}`;
};

module.exports = issueJwt;
