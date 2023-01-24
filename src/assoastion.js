const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);//creat instant from sequelize

const country = sequelize.define(
  "country",
  {
   name: { type: DataTypes.STRING,  allowNull: false,  },

  },
  { timestamps: false }
);

const capital = sequelize.define(
  "country",
  {
    name: { type: DataTypes.STRING,  allowNull: false,  },

  },
  { timestamps: false }
);

country.hasOne(capital);
Sequelize
  .async({ alter: true })
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });
