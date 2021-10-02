const express = require("express");
const passport = require("../service/passport.js");
// CONTROLLERS
const {
  test,
  register,
  login,
  protectedRoute,
} = require("../controllers/authController");

const router = express.Router();

// GET
router.get("/", passport.authenticate("jwt"), test);
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  protectedRoute
);

// POST
router.post("/register", register);
router.post("/login", login);

module.exports = router;
