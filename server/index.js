import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

mongoose.connect("mongodb+srv://admin:21123145@cluster0.olilxg5.mongodb.net/?retryWrites=true&w=majority")
.then(()=> {
    console.log("DB is connected");
})
.catch((err)=> {
    console.log("DB error"+err);
})

const app = express()

app.use(express.json())


app.get("/", (req,res) => {
    res.send("Hello World!!")
})

app.post("/auth/login", (req,res)=> {
    console.log(req.body);

    const token = jwt.sign({
        email: req.body.email,
        fullname: "Бека Маасалиев"
    }, "hash")

    res.json({
        success:true,
        token
    })
})

app.listen(5000, (err)=>{
    if(err){
        return console.log(err);
    }
    console.log("Server started without problems");
})