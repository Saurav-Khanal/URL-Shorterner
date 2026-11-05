require("node:dns").setServers(["8.8.8.8", "8.8.4.4"]);
const express=require("express");
const app=express();
require("dotenv").config();
const mongoose=require("mongoose");
const URL=require("./models/url");
const crypto = require("node:crypto");
const { url } = require("node:inspector");
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Mongodb Connected");  
app.listen(3000,()=>{
    console.log("Api is running on localhost 3000");
})
})

app.get("/",(req,res)=>{
    res.redirect("/index.html");
})

app.post("/shorten",async (req,res)=>{
    try{
    const originalUrl=req.body.url;
    if(!originalUrl){
        return res.status(401).json({
            message:"URL is required"
        })
    }
    const shortCode=crypto.randomBytes(6).toString('hex');
    const newUrl= await URL.create({
        originalurl:originalUrl,
        shortCode:shortCode
    })
    res.status(201).json({
        message:"URL shorten successFull",
        shortCode:shortCode
    })
}catch(err){
    res.status(500).json({
        message:"Internal server error"
    })
}
})

app.get("/shorten/:id",async (req,res)=>{
    try{
    const shortenCode=req.params.id;
    const UrlDocument=await URL.findOne({shortCode:shortenCode});
    if(!UrlDocument){
        return res.status(404).json({
            message:"Short Url does not exist"
        })
    }
    const originalUrl=UrlDocument.originalurl;
    res.redirect(originalUrl);
}catch(err){
    res.status(500).json({
        message:"Internal server error"
    })
}
})
