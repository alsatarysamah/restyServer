"use strict";
require("dotenv").config();
const express = require("express");
const authRouter = express.Router();
const { body } = require("express-validator");

const basic = require("../middleware/basic");
const bearerAuth = require("../middleware/bearer.js");


const {
  handleSignin,
  handleSignup,
} = require("./authHandlers.js");

///////////////signup/////////////////////
authRouter.post(
  "/signup",
  body("username", "Invalid or missing Email").not().isEmpty().isEmail(),
  body("password", "Invalid or missing password")
    .not()
    .isEmpty()
    .isLength({ min: 5, max: 8 }),
  handleSignup
);
///////////////signin/////////////////////////////////
authRouter.post("/signin", basic, handleSignin);


module.exports = authRouter;
