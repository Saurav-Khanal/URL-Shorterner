require("node:dns").setServers(["8.8.8.8", "8.8.4.4"]);
const express=require("express");
const app=express();
require("dotenv").config();
const mongoose=require("mongoose");
const URL=require("./models/url");
const crypto = require("node:crypto");
const { url } = require("node:inspector");
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

app.post("/shorten",async (req,res)=>{
    const originalUrl=req.body.url;
    const shortCode=crypto.randomBytes(6).toString('hex');
    const newUrl= await URL.create({
        originalurl:originalUrl,
        shortCode:shortCode
    })
    res.status(201).json({
        message:"URL shorten successFull",
        shortCode:shortCode
    })
})