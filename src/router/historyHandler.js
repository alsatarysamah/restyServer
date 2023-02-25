const { historyCollection, historysTable } = require("../models/index.js");
const { validationResult } = require("express-validator");

////////////////creat=insert////////////////////
async function creathistory(req, res) {
  try {
    validationResult(req).throw();

    let newHistory = req.body;
    req.body.response = [req.body.response];
    newHistory.userId = req.user.dataValues.id;
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
  let user = req.user.dataValues;
  if (req.user.dataValues.role == "user") {
    history = await historysTable.findAll({
      where: { userId: req.user.dataValues.id },
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

    const { id } = req.params;
    const { all } = req.query;

    if (!all) {
      const deletedRecord = await historyCollection.read(parseInt(id));
      await historyCollection.delete(parseInt(id));

      return res
        .status(200)
        .json({ message: "Deleted", deleted: deletedRecord });
    }

    if (req.user.dataValues.role !== "admin" || !all) {
      throw new Error("Unauthorized to delete all history records");
    }

    await historysTable.destroy({ where: {} });

    return res.status(200).json({ message: "All records deleted" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
}

module.exports = {
  getAll,
  deleting,
  updating,
  creathistory,
};
