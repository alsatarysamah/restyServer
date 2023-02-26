"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "users",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
     
      token: {
        type: DataTypes.VIRTUAL,
      },
      role: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user",
      },
    },
    { timestamps: false }
  );

  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);

    if (valid) {
      let newToken = jwt.sign({ username: user.username }, process.env.SECRET);
      user.token = newToken;
      return user;
    }

    throw new Error("Invalid User");
  };

  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, process.env.SECRET || "samah");
      const user = this.findOne({ where: { username: parsedToken.username } });
      if (user) {
        return user;
      }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return model;
};

module.exports = users;
