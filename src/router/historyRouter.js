const express = require("express");

const historyRouter = express.Router();
const bearer = require("../middleware/bearer");
const { check, body, oneOf, param } = require("express-validator");

const {
  getAll,
  getOneRecored,
  deleting,
  updating,
  creathistory,
} = require("./historyHandler");

///////get all//////////////////////////////////////
historyRouter.get("/history", bearer, getAll);

//////////post//////////////////////////////////////
historyRouter.post(
  "/history",
  body("url", "Invalid or missing URL").not().isEmpty().isURL(),
  body("method", "Invalid or missing method")
    .not("")
    .isEmpty()
    .isIn(["get", "post", "delete", "put"]),
    body("userId","Invalid or missing userId").not().isEmpty().isInt(),
  bearer,
  creathistory
);

////////////put////////////////////////////////////
historyRouter.put(
  "/history/:id",
  param("id", "Invalid id").isInt(),
  bearer,
  updating
);
//////////////delete/////////////////////////
historyRouter.delete(
  "/history/:id",
  param("id", "Invalid id").isInt(),
  bearer,
  deleting
);
////////////get one///////////////////////////
historyRouter.get(
  "/history/:id",
  param("id", "Invalid id").isInt(),
  bearer,
  getOneRecored
);

module.exports = historyRouter;
