const { check, body, oneOf } = require("express-validator");


const postValidation = () => {
  return [
    // oneOf([check("token").isEmpty()], "tokeeeeeeen"),
    body("url", "Invalid or Missing URL").not().isEmpty().isURL(),
    body("method", "Invalid or Missing method")
      .not("")
      .isEmpty()
      .isIn(["get", "post", "delete", "put"]),
    body("userId", "Invalid or missing userId").not().isEmpty().isInt(),
  ];
};
module.exports = { postValidation };
