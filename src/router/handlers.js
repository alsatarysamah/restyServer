'use strict';
require("dotenv").config();
const { users } = require('../models/index.js');
const bcrypt=require("bcrypt");
const { Sequelize } = require('sequelize');
async function handleSignup(req, res, next) {
  try {
 
  req.body.password = await bcrypt.hash(req.body.password, 10);  
  const userhistory = await users.create(req.body);
  // users.role = req.body.role;
    const output = {
      user: userhistory,
      role:userhistory.role,
      token: userhistory.token,
      action:userhistory.action
    };
    res.status(201).json(output);
  } catch (e) {

    next(e);
  }
}

async function handleSignin(req, res, next) {
  try {
    const user = {
      user: req.user,
      token: req.user.token
    };
    res.status(200).json(user);
  } catch (e) {
  
    next(e);
  }
}

async function handleUpdateUsers(req, res, next) {
  try {
    console.log(req.body.fav);
    let id = parseInt(req.params.id);
    let found = await users.findOne({ where: { id:id } });
    if (found) {
      let updated = await found.update(
        {favItems: req.body.fav},
        {where: {id: req.params.id}}
       );
    //  console.log(updated.favItems);
      res.status(201).json(updated);
    }
  } catch (e) {
  
    next(e);
  }

  
}

function handleSecret(req, res, next) {
  res.status(200).send("Welcome to the secret area!");
}

module.exports = {
  handleSignup,
  handleSignin,
  handleUpdateUsers,
  handleSecret
}
