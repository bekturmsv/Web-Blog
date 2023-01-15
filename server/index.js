import express from "express"
import mongoose from "mongoose"
import multer from "multer"
import { registerValidation, loginValidation } from "./validations/auth.js"
import chekAuth from "./utils/chekAuth.js";
import * as UserController from "./controllers/UserController.js"
import * as PostController from "./controllers/PostController.js"
import { postCreateValidation } from "./validations/post.js";

mongoose.connect("mongodb+srv://admin:21123145@cluster0.olilxg5.mongodb.net/Web-Blog?retryWrites=true&w=majority")
.then(()=> {
    console.log("DB is connected");
})
.catch((err)=> {
    console.log("DB error"+err);
})

const app = express()

const storage = multer.diskStorage({
    destination: (_, file, cb)=> {
        cb(null, "uploads");
    },
    filename: (_, file, cb)=> {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

app.use(express.json())
app.use("/uploads", express.static("uploads"))

app.post("/auth/login",loginValidation, UserController.login )
app.post("/auth/register",registerValidation, UserController.register )
app.get("/auth/profile",chekAuth, UserController.getUserInfo)

app.post("/upload", chekAuth, upload.single("image"),(req,res)=>{
    res.json({
        url:`/uploads/${req.file.originalname}`
    })
})

app.get("/posts",PostController.getAll)
app.get("/posts/:id", PostController.getOne)
app.post("/posts", chekAuth, postCreateValidation, PostController.create)
app.delete("/posts/:id", chekAuth, PostController.remove)
app.patch("/posts/:id",chekAuth, PostController.update)


app.listen(5000, (err)=>{
    if(err){
        return console.log(err);
    }
    console.log("Server started without problems");
})