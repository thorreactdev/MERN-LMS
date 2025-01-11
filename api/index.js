import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import http from "http"; // Import http for Socket.IO
import { Server } from "socket.io";
import path from 'path';
dotenv.config();

//routes import statement
import authRoute from "./router/authRouter.js";
import userRoute from "./router/userRouter.js";
import mediaRoute from "./router/admin/adminMediaUploadRouter.js";
import courseRoute from "./router/admin/courseRouter.js";
import studentRoute from "./router/user/studentCourseRouter.js";
import orderRoute from "./router/user/orderRouter.js";
import courseProgressRoute from "./router/user/courseProgressRouter.js";

mongoose.connect(process.env.MONGO_DB_URL).then(() => console.log("Connected to MongoDB")).catch((err) => console.log(err));
const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
// const io = new Server(server);
const io = new Server(server, {
    cors: {
        origin: "https://mern-lms-z3ed.onrender.com", // Adjust to your frontend URL
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


//routes declaration
app.use("/api" , authRoute);
app.use("/api" , userRoute);
app.use("/api",mediaRoute);
app.use("/api", courseRoute);
app.use("/api", studentRoute);
app.use("/api", orderRoute);
app.use("/api",courseProgressRoute);


// Set up socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
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
