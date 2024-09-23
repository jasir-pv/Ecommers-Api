import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import userRoute from "./routes/user.js"



const app = express()
dotenv.config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connection successful");
  } catch (err) {
    console.error("DB Connection failed:", err);
  }
};

connectDB();



app.use("/api/users", userRoute)



app.get("/api/test", ()=>{
    console.log("test is succesful");
    
})



app.listen (process.env.PORT || 5000, ()=>{
    console.log("Server Running");
    
} )