const {  body } = require("express-validator");


const postValidation = () => {
  console.log("***********************************",body("url"));
  return [
    body("url","Invalid or Missing URL").not().isEmpty(),
    body("method", "Invalid or Missing method")
      .not("")
      .isEmpty()
      .isIn(["get", "post", "delete", "put"]),
  ];
};
module.exports = { postValidation };
