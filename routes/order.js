import express, { Router } from "express"
import verifyToken, { verifyTokenAndAdmin } from "./verifyToken.js"
import verifyTokenAndAuthorization from "./verifyToken.js";
import Order from "../models/Order.js";

const router = Router()

  
// CREATE

router.post("/", verifyToken,async (req,res)=>{
    const newOrder = new Order(req.body)

    try{
        const savedOrder = await newOrder
        res.status(200).json(savedOrder)
    }catch(err){
        res.status(500).json(err)
    }
})

// UPDATE
router.put("/:id", verifyTokenAndAdmin,async (req,res)=>{

    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{
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

// // //  Get use Orders



router.get("/find/:userid",verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const orders = await Order.find({ userId: req.params.userId})
        res.status(200).json(orders)
    }catch{
        res.status(500).json(err)
    }
})

// // // GET ALL Producrts

router.get("/", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const orders = await Order.find()
        res.status(200).json(orders)

    }catch(err){
        res.status(500).json(err)
    }
})



// Get Monthly Income ...................

router.get("/income", verifyTokenAndAdmin, async (req,res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() -1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));
  
    try{
      const income = await Order.aggregate([
          {$match:{createdAt:{$gte: previousMonth }}},
  
      {$project : 
      {
          month:{$month: "$createdAt"},
          sales:"$amount"
      }
      },
      {
          $group: {
              _id: "$month",
              total: {$sum: "$sales"}
          }
      }
      ])
         res.status(200).json(income)
    }catch(err){
      res.status(500).json(err)
    }
  })

export default router;
