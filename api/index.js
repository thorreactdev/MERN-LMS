import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import http from "http"; // Import http for Socket.IO
import { Server } from "socket.io";
dotenv.config();

//routes import statement
import authRoute from "./router/authRouter.js";
import userRoute from "./router/userRouter.js";

mongoose.connect(process.env.MONGO_DB_URL).then(() => console.log("Connected to MongoDB")).catch((err) => console.log(err));

const app = express();
const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
// const io = new Server(server);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Adjust to your frontend URL
        methods: ["GET", "POST"],
        // allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

// Middleware to attach Socket.IO to req
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use(express.json());
app.use(cookieParser());


//routes declartion
app.use("/api" , authRoute);
app.use("/api" , userRoute);





// Set up socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(PORT , ()=> console.log(`Server running on port ${PORT}`));
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
