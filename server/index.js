import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { validationResult } from "express-validator"
import { registerValidation } from "./validations/auth.js"

mongoose.connect("mongodb+srv://admin:21123145@cluster0.olilxg5.mongodb.net/?retryWrites=true&w=majority")
.then(()=> {
    console.log("DB is connected");
})
.catch((err)=> {
    console.log("DB error"+err);
})

const app = express()

app.use(express.json())


app.post("/auth/register",registerValidation, (req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }
    res.json({
        success:true
    })
})

app.listen(5000, (err)=>{
    if(err){
        return console.log(err);
    }
    console.log("Server started without problems");
})