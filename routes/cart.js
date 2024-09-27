import express, { Router } from "express"
import verifyToken, { verifyTokenAndAdmin } from "./verifyToken.js"
import verifyTokenAndAuthorization from "./verifyToken.js";
import Cart from "../models/Cart.js";

const router = Router()


// CREATE

router.post("/", verifyToken,async (req,res)=>{
    const newOrder = new Order(req.body)

    try{
        const savedProduct = await newOrder
        res.status(200).json(savedOrder)
    }catch(err){
        res.status(500).json(err)
    }
})

// UPDATE
router.put("/:id", verifyTokenAndAdmin,async (req,res)=>{

    try{
        const updatedOrder = await Cart.findByIdAndUpdate(req.params.id,{
            $set: req.body
        }, {new:true}
    )
    res.status(200).json(updatedOrder)
    } catch (err){
        res.status(500).json(err)
    }
})


// // Delete

router.delete("/:id",verifyTokenAndAdmin, async (req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted...")
    }catch{
        res.status(500).json(err)
    }
})

// // //  Get user orders

router.get("/find/:userid",verifyTokenAndAdmin, async (req,res)=>{
    try{
        const orders = await Order.find()
        res.status(200).json(orders)
    }catch{
        res.status(500).json(err)
    }
})

// get monthly incom

router.get("/incone")


export default router;
