const bcrypt = require("bcrypt");
const User = require("../model/user"); //Model
const passport = require("../service/passport"); //service for passport login
const registerValidation = require("../service/validation");
const jwtHandler = require("../service/jwtHandler");

const test = (req, res, next) => {
  res.send("hello");
};

// REGISTER
const register = async (req, res, next) => {
  try {
    const { result, errors } = registerValidation(req.body);
    if (errors) {
      return res.status(400).json({ errors: result.errors });
    }
    const values = { ...result };
    values.password = await bcrypt.hash(result.password, 10);
    const user = await User.create(values);
    if (user) return res.status(201).json({ user: user.id });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const login = (req, res, next) => {
  try {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err || !user) return res.status(400).json(info);
      if (user) {
        req.logIn(user, { session: false }, (err) => {
          if (err) {
            console.log(err);
            return next(err);
          }
        });
        const authToken = jwtHandler(user.id); //handle creating token
        res
          .status(200)
          .json({ message: "logged in success", token: authToken });
      }
    })(req, res, next);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const protectedRoute = (req, res, next) => {
  return res
    .status(200)
    .json({ message: "Congrats, you are in protected route" });
};
module.exports = {
  test,
  register,
  login,
  protectedRoute,
};
