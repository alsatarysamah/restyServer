
const express = require("express");
const { json } = require("express/lib/response");

const {historyCollection, historysTable} = require("../models/index.js");
const historyRouter = express.Router();
const bearer=require("../middleware/bearer");
const reqValidation=require ("../middleware/reqValidation")

historyRouter.get("/history",bearer,getAll);
historyRouter.post("/history",bearer,reqValidation(),creathistory);
historyRouter.put("/history/:id",bearer,updating);
historyRouter.delete("/history/:id",bearer,deleting);
historyRouter.get("/history/:id",bearer,getOneRecored);


////////////////creat=insert////////////////////
async function creathistory(req,res){
let newhistory =req.body;
let newRecored=await historyCollection.create(newhistory);
res.status(201).json(newRecored);


}
///////////select *//////////////////
async function getAll(req,res){
    console.log(req.params);
    let history = await historyCollection.read();
    // let userhistory= await historysTable.findAll({where:{userId:req.body.userId}})
    res.status(200).json(history);

}

///////////////update/////////
async function updating(req,res){

    let id = parseInt(req.params.id);
    let newRecored = req.body;
    let found = await historyCollection.read(id);
    if (found) {
        let updated = await found.update(newRecored);
        res.status(201).json(updated);
    }
}
/////////////delete///////////////
async function deleting(req,res){

    let id = parseInt(req.params.id);
    let deleted = await historyCollection.delete(id);
    res.status(200).json(deleted);

}

/////////////get one/////////////

async function getOneRecored(req,res)
{
    const id = parseInt(req.params.id);
  let recored = await historyCollection.read(id);
  res.status(200).json(recored);
}
module.exports=historyRouter;
