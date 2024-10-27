import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

 mongoose.connect(process.env.MONGO_DB_URL).then(() => console.log("Connected to MongoDB")).catch((err) => console.log(err));

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/" , (req,res)=>{
    return res.status(200).send("Welcome to MERN-LMS");
})

app.listen(PORT , ()=> console.log(`Server running on port ${PORT}`));
