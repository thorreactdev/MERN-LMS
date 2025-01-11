import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : String,
    userName : String,
    userEmail : String,
    orderStatus : String,
    paymentMethod : String,
    paymentStatus : String,
    orderDate : Date,
    paymentId : String,
    instructorId : String,
    instructorEmail : String,
    instructorName : String,
    courseImage : String,
    courseTitle : String,
    courseId : String,
    coursePricing : String,
    description : String,
    sessionId : String,
    cryptoSessionToken : String,
    receiptURL : String,
} , { timestamps : true});

const Order = mongoose.model("Order", orderSchema);
export default Order;