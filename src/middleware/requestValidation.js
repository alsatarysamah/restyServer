let isUrlHttp = require("is-url-http");

function checkMethod(method) {
  let methods = ["get", "post", "delete", "put"];
  if (methods.includes(method.toLowerCase())) return true;
  else throw new Error("Invalid method");
}
function checkNullURL(url) {
  if (!url )
    throw new Error("You should have  URL ");
}
function checkNullMethod(method) {
  if ( !method)
    throw new Error("You should have  method");
}
function checkURL(testUrl) {
  if (!isUrlHttp(testUrl)) throw new Error("Invalid URL");
}

module.exports = { checkURL, checkNullURL,checkNullMethod, checkMethod };
