const { historyCollection, historysTable } = require("../models/index.js");
const { validationResult } = require("express-validator");

////////////////creat=insert////////////////////
async function creathistory(req, res) {
  try {
    validationResult(req).throw();

    let newHistory = req.body;
    req.body.response = [req.body.response];
    let newRecored = await historyCollection.create(newHistory);
    res.status(201).json(newRecored);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
}
///////////select *//////////////////
async function getAll(req, res) {
  let history;
  if (req.query.url) {
    history = await historysTable.findAll({ where: { url: req.query.url } });
  }
  if (req.query.userId) {
    history = await historysTable.findAll({
      where: { userId: req.query.userId },
    });
  } else history = await historyCollection.read();
  res.status(200).json(history);
}

///////////////update/////////
async function updating(req, res) {
  try {
    validationResult(req).throw();

    let id = parseInt(req.params.id);
    let newRecored = req.body;
    let found = await historyCollection.read(id);
    if (found) {
      let updated = await historyCollection.update(id, newRecored);
      let up = await historyCollection.read(id);
      res.status(201).json(up);
    }
  } catch (e) {
    res.status(400).json(e);
  }
}
/////////////delete///////////////
async function deleting(req, res) {
  try {
    validationResult(req).throw();
    let id = parseInt(req.params.id);
    let deleted = await historyCollection.delete(id);
    return res.status(204).json("deleted");
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
}

/////////////get one/////////////

async function getUserRecoreds(req, res) {
  try {
    validationResult(req).throw();
    const id = parseInt(req.params.id);
    let record = await await historysTable.findAll({ where: { id: id } });

    if (record === null) throw new Error("Invalid id");
    return res.status(200).json(record);
  } catch (e) {
    console.log(e.message);
    return res.status(400).json(e);
  }
}
/////   getByUrl
async function getByUrl(req, res) {
  try {
    validationResult(req).throw();
    const url = parseInt(req.query.url);
    let record = await historysTable.findAll({ where: { url: url } });

    if (record === null) throw new Error("Invalid id");
    return res.status(200).json(record);
  } catch (e) {
    console.log(e.message);
    return res.status(400).json(e);
  }
}
module.exports = {
  getAll,
  getUserRecoreds,
  deleting,
  updating,
  creathistory,
  getByUrl,
};
