"use strict";
require("dotenv").config();
const { users } = require("../models/index.js");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

async function handleSignup(req, res, next) {
  try {
    validationResult(req).throw();

    req.body.password = await bcrypt.hash(req.body.password, 10);
    const userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
    };

    return res.status(201).json(output);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
}

async function handleSignin(req, res, next) {
  try {
    const user = {
      user: req.user,
    };
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e);
  }
}

module.exports = {
  handleSignup,
  handleSignin,
};
