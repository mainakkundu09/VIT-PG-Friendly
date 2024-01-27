import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"

import authRoute from "./api/routes/auth.js"
import usersRoute from "./api/routes/users.js"
import hotelsRoute from "./api/routes/hotels.js"
import roomsRoute from "./api/routes/rooms.js"
import cookieParser from "cookie-parser";



const app = express()
dotenv.config();


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB");
      } catch (error) {
        throw error;
      }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("Disconnected from MongoDB")
})

// middlewares
app.use(cookieParser()) // parse incoming requests with JSON payloads
app.use(express.json())
app.use(cors())

app.use("/api/auth", authRoute );
app.use("/api/users", usersRoute );
app.use("/api/hotels", hotelsRoute );
app.use("/api/rooms", roomsRoute );

// // const port = process.env.PORT || 4000;
// app.use((err,req,res,next)=>{
//     const errorStatus = err.status || 500
//     const errorMessage = err.message || "Something went wrong!"
//     return res.status(500).json({
//         success: false,
//         status: errorStatus,
//         message: errorMessage,
//         stack: err.stack,
//     });
// });

// const cookieParser = require('cookie-parser');
// const bcrypt = require('bcryptjs');


app.listen(9600, ()=>{
    connect()
    console.log("Connected to backend.")
});