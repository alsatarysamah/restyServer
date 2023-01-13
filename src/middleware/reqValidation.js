"use strict";

module.exports = () => {
  return (req, res, next) => {
    try {
      checkNull(req.body);
      if (methodValidation(req.body.method)) {
        req.body.method = req.body.method.toLowerCase();
      }
      next();
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
};
function methodValidation(method) {
  let methods = ["get", "post", "delete", "put"];
  if (methods.includes(method.toLowerCase())) return true;
  else throw new Error("Invalid method");
}
function checkNull(body) {
  if (!body.url || !body.method)
    throw new Error("You should have  URL and method");
}
