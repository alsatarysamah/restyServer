const historyModel = (sequelize, DataTypes) => sequelize.define('histories', {
 
    url: { type: DataTypes.STRING,  allowNull: false,  },
    method: { type: DataTypes.STRING , defaultValue: "get"},
    response: { type: DataTypes.JSON ,  allowNull: true,},
  },{ timestamps: false });
  
    
  
    module.exports = historyModel;
    