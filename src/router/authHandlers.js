"use strict";
require("dotenv").config();
const { users } = require("../models/index.js");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

async function handleSignup(req, res, next) {
  try {
    const errors = validationResult(req);

    req.body.password = await bcrypt.hash(req.body.password, 10);
    const userhistory = await users.create(req.body);
    const output = {
      user: userhistory,
      role: userhistory.role,
      token: userhistory.token,
      action: userhistory.action,
    };
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return res.status(201).json(output);
  } catch (e) {
    next(e);
  }
}

async function handleSignin(req, res, next) {
  try {
    const user = {
      user: req.user,
    };
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  handleSignup,
  handleSignin,
};
