import express, { Router } from "express"
import User from "../models/User"


const router = Router()


// Register

router.post("/register",async (req,res)=>{

    const newUser = newUser({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,

    })
    try{
        
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
    console.log(savedUser);
    }catch(err){
        res.status(500).json(err);
    }

    
})



export default router;