require("node:dns").setServers(["8.8.8.8", "8.8.4.4"]);
const express=require("express");
const app=express();
require("dotenv").config();
const mongoose=require("mongoose");
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Mongodb Connected");  
app.listen(3000,()=>{
    console.log("Api is running on localhost 3000");
})
})


app.get("/",(req,res)=>{
    res.send("Your backend is running");
})
