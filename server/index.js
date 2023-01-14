import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { validationResult } from "express-validator"
import { registerValidation } from "./validations/auth.js"
import UserModel from "./models/User.js"
import chekAuth from "./utils/chekAuth.js";
import User from "./models/User.js"

mongoose.connect("mongodb+srv://admin:21123145@cluster0.olilxg5.mongodb.net/Web-Blog?retryWrites=true&w=majority")
.then(()=> {
    console.log("DB is connected");
})
.catch((err)=> {
    console.log("DB error"+err);
})

const app = express()

app.use(express.json())

app.post("/auth/login", async (req,res)=> {
    try{
        const user = await UserModel.findOne({email: req.body.email});

        if(!user){
            return req.status(404).json({
                message: "Пользователь не найден"
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if(!isValidPass){
            return res.status(400).json({
                message: "Неверный логин или пароль"
            })
        }

        const token = jwt.sign({
            _id: user._id
        },"hash",{
            expiresIn: "30d"
        })

        const {passwordHash, ...userData } = user._doc

    res.json({
        ...userData,
        token
    })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Не удалось авторизоваться",
        })
    }
})

app.post("/auth/register",registerValidation, async (req,res)=> {
    
try{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash : hash
    })

    const user = await doc.save();

    const token = jwt.sign({
        _id: user._id
    },"hash",{
        expiresIn: "30d"
    })

    const {passwordHash, ...userData } = user._doc

    res.json({
        ...userData,
        token
    })
}catch(err){
    console.log(err);
    res.status(500).json({
        message: "Не удалось зарегистрироваться",
    })
}
})

app.get("/auth/profile",chekAuth,async  (req,res)=> {
    try {

        const user = await UserModel.findById(req.userId)
        if(!user){
            return res.status(404)({
                message: "Пользователь не надйен"
            })
        }

        const {passwordHash, ...userData } = user._doc

    res.json(userData)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Нет доступа"
        })
    }
})

app.listen(5000, (err)=>{
    if(err){
        return console.log(err);
    }
    console.log("Server started without problems");
})