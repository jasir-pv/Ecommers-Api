import express, { Router } from "express"
import verifyToken, { verifyTokenAndAdmin } from "./verifyToken.js"
import verifyTokenAndAuthorization from "./verifyToken.js";
import Cart from "../models/Cart.js";

const router = Router()


// CREATE

router.post("/", verifyToken,async (req,res)=>{
    const newCart = new Cart(req.body)

    try{
        const savedProduct = await newCart
        res.status(200).json(savedCart)
    }catch(err){
        res.status(500).json(err)
    }
})

// UPDATE
router.put("/:id", verifyTokenAndAuthorization,async (req,res)=>{

    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{
            $set: req.body
        }, {new:true}
    )
    res.status(200).json(updatedCart)
    } catch (err){
        res.status(500).json(err)
    }
})


// // Delete

router.delete("/:id",verifyTokenAndAuthorization, async (req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted...")
    }catch{
        res.status(500).json(err)
    }
})

// // //  Get CART

router.get("/find/:userid",verifyTokenAndAdmin, async (req,res)=>{
    try{
        const Cart = await Cart.find({userId: req.params.userId})
        res.status(200).json(Cart)
    }catch{
        res.status(500).json(err)
    }
})

// // // GET ALL Producrts

router.get("/", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const carts = await Cart.find()
        res.status(200).json(carts)

    }catch(err){
        res.status(500).json(err)
    }
})


export default router;
