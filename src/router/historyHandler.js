
const { historyCollection } = require("../models/index.js");
const {
   
    validationResult,
  } = require("express-validator");

////////////////creat=insert////////////////////
async function creathistory(req, res) {
    try {
      validationResult(req).throw();
  
      let newhistory = req.body;
      let newRecored = await historyCollection.create(newhistory);
      res.status(201).json(newRecored);
    } catch (e) {
      res.status(400).json(e);
    }
  }
  ///////////select *//////////////////
  async function getAll(req, res) {
    console.log(req.params);
    let history = await historyCollection.read();
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
        let updated = await found.update(newRecored);
        res.status(201).json(updated);
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
  
  async function getOneRecored(req, res) {
    try {
      validationResult(req).throw();
      const id = parseInt(req.params.id);
      let record = await historyCollection.read(id);
      console.log(record);
      if(record===null)
      throw new Error("Invalid id")
     return res.status(200).json(record);
    } catch (e) {
      console.log(e.message);
     return res.status(400).json(e);
    }
  }

  module.exports={getAll,getOneRecored,deleting,updating,creathistory}