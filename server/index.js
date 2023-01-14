import express from "express"
import mongoose from "mongoose"
import { registerValidation, loginValidation } from "./validations/auth.js"
import chekAuth from "./utils/chekAuth.js";
import * as UserController from "./controllers/UserController.js"

mongoose.connect("mongodb+srv://admin:21123145@cluster0.olilxg5.mongodb.net/Web-Blog?retryWrites=true&w=majority")
.then(()=> {
    console.log("DB is connected");
})
.catch((err)=> {
    console.log("DB error"+err);
})

const app = express()

app.use(express.json())

app.post("/auth/login",loginValidation, UserController.login )
app.post("/auth/register",registerValidation, UserController.register )
app.get("/auth/profile",chekAuth, UserController.getUserInfo)

app.listen(5000, (err)=>{
    if(err){
        return console.log(err);
    }
    console.log("Server started without problems");
})