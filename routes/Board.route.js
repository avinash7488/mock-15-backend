const express = require("express");
const boardRouter = express.Router();
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");
const { BoardModel } = require("../modal/Board.model");
const { TaskModel } = require("../modal/Task.model");
const { SubtaskModel } = require("../modal/Subtask.model");


boardRouter.post("/", async(req,res)=>{
    const payload= req.body;
    const {userID}=req.body;
    console.log(userID);
try{
    const board= new BoardModel({...payload,userID});
    board.save();
    res.send({"msg":"Board Created"})
}catch(err){
    res.send({"msg":"somthing went wrong","error":err.message})
}
})

boardRouter.get("/get", async(req,res)=>{
    const {userID}=req.body;
try{
    const board= await BoardModel.find({userID});
    res.send({"msg":"Your board","board":board})
}catch(err){
    res.send({"msg":"somthing went wrong","error":err.message})
}
})


boardRouter.post("/task/:id", async(req,res)=>{
    const payload= req.body;
    const ID= req.params.id;
try{
    const task= new TaskModel({...payload,boardID:ID});
    task.save();
    res.send({"msg":"Task Created","task":task})
}catch(err){
    res.send({"msg":"somthing went wrong","error":err.message})
}
})


boardRouter.patch("/task/update/:id", async(req,res)=>{
    const ID= req.params.id;
    const payload=req.body;
try{
    TaskModel.findByIdAndUpdate({_id:ID},payload)
    res.send({"msg":"Task updated"})
}catch(err){
    res.send({"msg":"somthing went wrong","error":err.message})
}
})


boardRouter.delete("/task/delete/:id", async(req,res)=>{
    const ID= req.params.id;
try{
    TaskModel.findByIdAndDelete({_id:ID});
    SubtaskModel.findByIdAndDelete({taskID:ID})
    res.send({"msg":"Task Deleted"})
}catch(err){
    res.send({"msg":"somthing went wrong","error":err.message})
}
})


boardRouter.post("/subtask/:id", async(req,res)=>{
    const payload= req.body;
    const ID= req.params.id;
try{
    const subtask= new SubtaskModel({...payload,taskID:ID});
    subtask.save();
    res.send({"msg":"SubTask Created","task":subtask})
}catch(err){
    res.send({"msg":"somthing went wrong","error":err.message})
}
})


boardRouter.patch("/subtask/update/:id", async(req,res)=>{
    const ID= req.params.id;
    const payload=req.body;
try{
    SubtaskModel.findByIdAndUpdate({_id:ID},payload)
    res.send({"msg":"Subtask updated"})
}catch(err){
    res.send({"msg":"somthing went wrong","error":err.message})
}
})


module.exports={boardRouter}