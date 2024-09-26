import express, { Router } from "express"
import verifyToken, { verifyTokenAndAdmin } from "./verifyToken.js"
import verifyTokenAndAuthorization from "./verifyToken.js";
import User from "../models/User.js";

const router = Router()


// UPDATE
router.put("/:id", verifyTokenAndAuthorization,async (req,res)=>{
    if (req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString()
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        }, {new:true}
    )
    res.status(200).json(updatedUser)
    } catch (err){
        res.status(500).json(err)
    }
})


// Delete

router.delete("/:id",verifyTokenAndAuthorization, async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")
    }catch{
        res.status(500).json(err)
    }
})

//  Get user

router.get("/:id",verifyTokenAndAdmin, async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        const {password, ...others} = user._doc
        res.status(200).json(others)
    }catch{
        res.status(500).json(err)
    }
})

export default router;
