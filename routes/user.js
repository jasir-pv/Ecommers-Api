import express, { Router } from "express"

const router = Router()


router.get("/usertest", (req,res)=>{
    res.send("user test is succesful")
})

router.post("/userposttest", (req,res)=>{
    const username =req.body.username
    console.log(username);
    
})


export default router;
