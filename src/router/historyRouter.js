const express = require("express");

const historyRouter = express.Router();
const bearer = require("../middleware/bearer");
const { param } = require("express-validator");

const {
  getAll,
  getOneRecored,
  deleting,
  updating,
  creathistory,
} = require("./historyHandler");
const { postValidation } = require("../middleware/postValidation");

///////get all//////////////////////////////////////
historyRouter.get("/history", bearer, getAll);

//////////post//////////////////////////////////////
historyRouter.post("/history", postValidation(), bearer, creathistory);

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
