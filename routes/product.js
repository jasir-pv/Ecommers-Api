import express, { Router } from "express"
import verifyToken, { verifyTokenAndAdmin } from "./verifyToken.js"
import verifyTokenAndAuthorization from "./verifyToken.js";
import Product from "../models/Product.js";

const router = Router()


// CREATE

router.post("/", verifyTokenAndAdmin,async (req,res)=>{
    const newProduct = new Product(req.body)

    try{
        const savedProduct = await newProduct
        res.status(200).json(savedProduct)
    }catch(err){
        res.status(500).json(err)
    }
})

// UPDATE
router.put("/:id", verifyTokenAndAdmin,async (req,res)=>{

    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
            $set: req.body
        }, {new:true}
    )
    res.status(200).json(updatedProduct)
    } catch (err){
        res.status(500).json(err)
    }
})


// Delete

router.delete("/:id",verifyTokenAndAdmin, async (req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted...")
    }catch{
        res.status(500).json(err)
    }
})

// //  Get Product

router.get("/find/:id",verifyTokenAndAdmin, async (req,res)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id)
        res.status(200).json(product)
    }catch{
        res.status(500).json(err)
    }
})

// // GET ALL Producrts

router.get("/",verifyTokenAndAdmin, async (req,res)=>{
    const qNew = req.query.new
    const qCategory = req.query.category
    try{

        let products;


        if(qnew){
            products  = await Product.find().sort({createdAt:-1}).limit(5)
        }else if(qCategory){
            products = await Product.find({categories:{
                $in:[qCategory],

            }})
        }
        res.status(200).json(products)
    }catch{
        res.status(500).json(err)
    }


})


export default router;
