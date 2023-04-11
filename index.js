const express = require("express");
const cors = require("cors");
require('dotenv').config();
const {auth} = require("./middleware/auth.middleware");
const {connecion}= require("./config/db")
const { userRouter } = require("./routes/User.route");






const app= express();
app.use(express.json());
// app.use("/user",auth);
app.use(cors());
app.use("/user",userRouter);




// Homepage---------------->
app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

// app.get("/user/get",async(req,res)=>{
//     try{
//         const user = await AccountModel.find();
//         res.send(user)
//     }catch(err){
//         res.send({"msg":"somthing went wrong! cannot Get User","error":err.message})
//     }
// })


// app.patch("/update/:id",async(req,res)=>{
//     const {id}=req.params;
//     const payload= req.body;

//     try{
//         await AccountModel.findByIdAndUpdate({_id:id},payload);
//         res.send({"msg":"Account updated"})
//     }catch(err){
//         res.send({"msg":"somthing went wrong! cannot update Account","error":err.message})
//     }
// })

// app.delete("/delete/:id",async(req,res)=>{
//     const {id}=req.params;
//     try{
//         await AccountModel.findByIdAndDelete({_id:id});
//         res.send({"msg":"Account Closed"})
//     }catch(err){
//         res.send({"msg":"somthing went wrong! cannot close the Account","error":err.message})
//     }
// })


// app.post("/transaction/:id",async(req,res)=>{
//     const {id}=req.params;
//     const payload= req.body;

//     try{
//         await LedgerModel.findByIdAndUpdate({_id:id},payload);
//         res.send({"msg":"Account updated"})
//     }catch(err){
//         res.send({"msg":"somthing went wrong! cannot update Account","error":err.message})
//     }
// })


app.listen(process.env.port,async()=>{
    try{
        await connecion;
        console.log("connected to DB")
    }catch(err){
        console.log("server error")
    }
    console.log(`server is running at port ${process.env.port}`);
})