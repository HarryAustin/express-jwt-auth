const bcrypt = require("bcrypt");
const passport = require("passport");
const Local = require("passport-local").Strategy;
const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("../model/user");

const fs = require("fs");
const path = require("path");
const mainPath = require("../../file_extension");

const authHandler = async (username, password, cb) => {
  const user = await User.findOne({
    $or: [{ username: username }, { email: username }],
  }); //either use email or username
  if (!user) {
    cb(null, false, { errors: { username: "Such account does not exists" } });
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    cb(null, false, { non_field_errors: "Wrong credentials" });
  }
  return cb(null, user, { message: "logged in success" });
};

passport.use(new Local(authHandler));

// FOR JWT STRATEGY
const pathToPubKey = path.join(mainPath, "server", "keys", "rsa_pub_key.pem");
const PUB_KEY = fs.readFileSync(pathToPubKey, "utf8");
console.log(PUB_KEY);
const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};
const jwtHandler = async (payload, cb) => {
  try {
    const { id } = payload;
    console.log(id);
    const user = await User.findById(id);
    if (user) {
      return cb(null, user);
    } else {
      return cb(null, false, { message: "Token or some error occured" });
    }
  } catch (err) {
    console.log(err);
  }
};
passport.use(new jwtStrategy(options, jwtHandler));

module.exports = passport;
