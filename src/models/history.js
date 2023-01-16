const { JSONB } = require("sequelize");

const historyModel = (sequelize, DataTypes) => sequelize.define('histories', {
 
    url: { type: DataTypes.STRING,  allowNull: false,  },
    method: { type: DataTypes.ENUM('get', 'put', 'post', 'delete'),defaultValue: "get"},
    response: { type: DataTypes.ARRAY(JSONB) ,  allowNull: true,},
  },{ timestamps: false });
  
    
  
    module.exports = historyModel;
    