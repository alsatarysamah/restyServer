const { userCollection: users } = require("../models/index");
const { body } = require("express-validator");
 
 
 const userValidationRules = () => {
    return [
      body("username", "Invalid or missing Email")
        .not()
        .isEmpty()
        .isEmail()
        .custom(async (value) => {
          const user = await users.readByUsername(value);
          if (user) {
            return Promise.reject("E-mail is already in use");
          }
        }),
      body("password", "Invalid or missing password")
        .not()
        .isEmpty()
        .isLength({ min: 6, max: 8 }),
        body("role", "Invalid or Missing role")
        .not("")
        .isEmpty()
        .isIn(["admin","user"]),
    ];
  };
  module.exports={userValidationRules};