"use strict";
require("dotenv").config();
const express = require("express");
const authRouter = express.Router();

const basic = require("../middleware/basic");

const bearerAuth = require("../middleware/bearer.js");
const {userValidationRules}=require("../middleware/userValidation")
const { handleSignin, handleSignup } = require("./authHandlers.js");


///////////////signup/////////////////////
authRouter.post("/signup",userValidationRules(), handleSignup);
///////////////signin/////////////////////////////////
authRouter.post("/signin", basic, handleSignin);

module.exports = authRouter;
