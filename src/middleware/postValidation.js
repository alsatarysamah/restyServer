"use strict";

let {
  checkURL,
  checkNullURL,
  checkNullMethod,
  checkMethod,
} = require("./requestValidation");

module.exports = () => {
  return (req, res, next) => {
    try {
      checkNullURL(req.body.url);
      checkNullMethod(req.body.method);
      checkURL(req.body.url);
      if (checkMethod(req.body.method)) {
        req.body.method = req.body.method.toLowerCase();
      }

      next();
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
};
