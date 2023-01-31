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
     
        if (req.body.url   ) {
          checkNullURL(req.body.url)
        checkURL(req.body.url);
      }

      if (req.body.method&&   checkMethod(req.body.method)) {
        checkNullMethod(req.body.method)
        req.body.method = req.body.method.toLowerCase();
      }

      next();
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
};
