import express, { Router } from "express"
import User from "../models/User.js"
import CryptoJS from "crypto-js"
import jwt from "jsonwebtoken"
import verifyToken from "./verifyToken.js"


const router = Router()


// Register

router.post("/register",async (req,res)=>{

    const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:CryptoJS.AES.encrypt(
                req.body.password, 
                process.env.PASS_SEC).toString()

    })
    try{
        
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
    console.log(savedUser);
    }catch(err){
        res.status(500).json(err);
    }

    
})


// LOGIN

    router.post("/login", async( req,res)=>{
        try{
            const user= await User.findOne({username:req.body.username})
            !user && res.status(401).json("Wrong credantials")
            const hashedPassword = CryptoJS.AES.decrypt(
                user.password,
                process.env.PASS_SEC
            )

            const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

            originalPassword!== req.body.password &&
            res.status(401).json("wrong credentials")

            const accessToken = jwt.sign({
                id:user._id, isAdmin: user.isAdmin
            },process.env.JWT_SEC,
        {expiresIn:"3d"})

            const {password, ...others} = user._doc

            res.status(200).json({others,accessToken})
        } catch (err){
            res.status(500).json(err)
        }

    })





export default router;