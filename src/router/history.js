
const express = require("express");

const {historyCollection} = require("../models/index.js");
const historyRouter = express.Router();
const bearer=require("../middleware/bearer");
const postValidation=require ("../middleware/postValidation")
const idvalidation=require("../middleware/idValidation")
const putValidation=require ("../middleware/putValidation")


historyRouter.get("/history",bearer,getAll);
historyRouter.post("/history",postValidation(),bearer,creathistory);
historyRouter.put("/history/:id",idvalidation(),putValidation(),bearer,updating);
historyRouter.delete("/history/:id",idvalidation(),bearer,deleting);
historyRouter.get("/history/:id",idvalidation(),bearer,getOneRecored);


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
    res.status(200).json(history);

}

///////////////update/////////
async function updating(req,res){
// try{
    let id = parseInt(req.params.id);
    let newRecored = req.body;
    let found = await historyCollection.read(id);
    if (found) {
        let updated = await found.update(newRecored);
        res.status(201).json(updated);
    }
// }catch(e){
//     res.status(500).json("invalid id or body");

// }
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
