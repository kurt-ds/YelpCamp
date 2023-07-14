const express = require("express");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();
const passport = require("passport");
const {storeReturnTo} = require('../middleware');

const User = require("../models/user");
const users = require('../controllers/users');

router.get("/register", users.renderRegister);

router.post("/register",catchAsync(users.register));

router.get("/login", users.renderLogin);

router.post(
  "/login",
  storeReturnTo,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  users.login
);

router.get('/logout', users.logout);


module.exports = router;
