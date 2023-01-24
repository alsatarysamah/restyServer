'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const users = require('./users.js');

const historyModel=require("./history")



const DataCollection=require("./lib/data-collection");

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);//creat instant from sequelize


const userTable = users(sequelize, DataTypes);//use sequelize to creat model
const userCollection=new DataCollection(userTable);


const historysTable = historyModel(sequelize, DataTypes);
const historyCollection=new DataCollection(historysTable);
//relations//////////////////////////////////////



userTable.hasMany(historysTable); // user many historys
historysTable.belongsTo(userTable); // history one user

const country = sequelize.define(
  "country",
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  { timestamps: false }
);

const capital = sequelize.define(
  "capital",
  {
    name: {
      type:DataTypes.STRING,
      unique: true,
    },
  },
  { timestamps: false }
);

country.belongsToMany(capital,{through:"bridge"});//inside the () the tabble that contain the forigenkey
capital.belongsTo(country,{through:"bridge"})
module.exports = {
    db: sequelize,
    users: users(sequelize, DataTypes),
    userCollection:userCollection,
    historyCollection:historyCollection,
    historysTable:historysTable
  };