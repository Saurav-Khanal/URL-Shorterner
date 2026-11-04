const express=require("express");
const app=express();
app.use(express.json());

app.listen(3000,()=>{
    console.log("Api is running on localhost 3000");
})

app.get("/",(req,res)=>{
    res.send("Your backend is running");
})
