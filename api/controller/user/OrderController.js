import {errorHandler} from "../../helper/errorHandler.js";
import stripeKey from "../../helper/stripeConfig.js";
import Order from "../../model/OrderModal.js";
import StudentCourse from "../../model/studentCourseModal.js";
import Course from "../../model/courseModal.js";
import * as crypto from "node:crypto";
import pdfDocument from "pdfkit";
import fs from "fs"
import path from "path";
import {fileURLToPath} from 'url';
import {uploadToMedia} from "../../helper/cloudinary.js";


export const createOrder = async (req, res, next) => {
    try {
        const cryptoSessionToken = crypto.randomBytes(16).toString("hex");
        console.log(cryptoSessionToken);
        const {
            userId, userName, userEmail, orderStatus, paymentMethod,
            paymentStatus, orderDate, paymentId, instructorId, instructorEmail, instructorName, courseImage,
            courseTitle, courseId, coursePricing, description, sessionId, receiptURL
        } = req.body

        // Check if the user is the course creator
        if (userId === instructorId) {
            return next(errorHandler(400, "You cannot purchase your own created course"));
        }
        // Check if the user has already purchased the course
        const studentCourse = await StudentCourse.findOne({userId});

        if (studentCourse) {
            const courseExists = studentCourse.courses.some((course) =>
                course.courseId.toString() === courseId.toString()
            );

            if (courseExists) {
                return res.status(400).json({
                    success: false,
                    message: "You have already purchased this course."
                });
            }
        }

        const newlyCreatedOrder = new Order({
            userId,
            userName,
            userEmail,
            orderStatus,
            paymentMethod,
            paymentStatus,
            orderDate,
            paymentId,
            instructorId,
            instructorEmail,
            instructorName,
            courseImage,
            courseTitle,
            courseId,
            coursePricing,
            description,
            sessionId,
            cryptoSessionToken: cryptoSessionToken,
            receiptURL
        });
        await newlyCreatedOrder.save();
        const session = await stripeKey.checkout.sessions.create({
            payment_method_types: ["card", "amazon_pay"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: courseTitle,
                            images: [courseImage],
                            description: description
                        },
                        unit_amount: coursePricing * 100
                    },
                    quantity: 1
                }
            ],
            metadata: {
                userId, courseId
            },
            success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}&orderId=${newlyCreatedOrder?._id}&token=${cryptoSessionToken}&courseId=${courseId}`,
            cancel_url: `http://localhost:5173/cancel_payment?token=${cryptoSessionToken}`,
        });

        res.status(201).json({
            success: true,
            message: "Order Created",
            sessionId: session.id,
            orderId: newlyCreatedOrder?._id
        });

    } catch (err) {
        console.log(err);
        return next(errorHandler(500, "Cannot Create Order, Internal Server Error"));
    }
}

export const capturePayment = async (req, res, next) => {
    try {
        const {paymentMethod, paymentStatus, paymentId, orderStatus, sessionId, orderId} = req.body;
        console.log(orderId);

        let order = await Order.findById(orderId);
        console.log(order);
        if (!order) {
            return next(errorHandler(400, "No Order Found"));
        }
        order.paymentMethod = paymentMethod;
        order.paymentStatus = paymentStatus;
        order.paymentId = paymentId;
        order.orderStatus = orderStatus;
        order.sessionId = sessionId;

        const updatedOrder = await order.save();
        console.log("after update data", updatedOrder);

        // update student course modal
        const studentCourse = await StudentCourse.findOne({
            userId: updatedOrder?.userId
        })

        if (studentCourse) {
            //check course already exists
            const courseExists = await studentCourse?.courses?.some((course) => course?.courseId.toString() === updatedOrder?.courseId?.toString());
            if (!courseExists) {
                studentCourse.courses.push({
                    courseId: updatedOrder?.courseId,
                    title: updatedOrder?.courseTitle,
                    instructorId: updatedOrder?.instructorId,
                    instructorName: updatedOrder?.instructorName,
                    dateOfPurchase: updatedOrder?.orderDate,
                    courseImage: updatedOrder?.courseImage,
                    receiptURL: "",
                })
                await studentCourse.save();
            }
        } else {
            const newStudentCourse = new StudentCourse({
                userId: updatedOrder?.userId,
                courses: [
                    {
                        courseId: updatedOrder?.courseId,
                        title: updatedOrder?.courseTitle,
                        instructorId: updatedOrder?.instructorId,
                        instructorName: updatedOrder?.instructorName,
                        dateOfPurchase: updatedOrder?.orderDate,
                        courseImage: updatedOrder?.courseImage,
                        receiptURL: "",

                    }
                ]
            });
            await newStudentCourse.save();
        }


        await Course.findById(updatedOrder?.courseId).then(async (course) => {
            // Check if the student already exists in the course's students array
            const studentExists = course?.students?.some((student) => student.studentID.toString() === updatedOrder?.userId.toString());

            if (!studentExists) {
                // If the student doesn't exist, then add the student to the course's students array
                await Course.findByIdAndUpdate(updatedOrder?.courseId, {
                    $addToSet: {
                        students: {
                            studentID: updatedOrder?.userId,
                            studentName: updatedOrder?.userName,
                            studentEmail: updatedOrder?.userEmail,
                            paidAmount: updatedOrder?.coursePricing,
                        }
                    }
                });
            }
        });


        res.status(200).json({
            success: true,
            message: "Order confirmed",
            data: order

        });
    } catch (e) {
        console.log(e);
        return next(errorHandler(500, "Cannot Create Order, Internal Server Error"));
    }
}

export const verifyPaymentAndSaveData = async (req, res, next) => {
    try {
        const {sessionId, orderId, courseId} = req.query;
        console.log(sessionId, orderId);
        if (!sessionId) {
            return next(errorHandler(404, "Session ID Not Found Payment Failed"));
        }
        const orderDataFromStripe = await stripeKey.checkout.sessions.retrieve(sessionId);
        const paymentIntent = await stripeKey.paymentIntents.retrieve(orderDataFromStripe?.payment_intent);
        res.status(200).json({
            success: true,
            data: {
                orderDataFromStripe,
                paymentIntent,
                orderId,
                courseId
            }
        });
    } catch (e) {
        console.log(e);
        return next(errorHandler(500, "Cannot Verify Payment, Internal Server Error"));
    }
}

export const verifyCancelSession = async (req, res, next) => {
    try {
        const {token} = req.query;
        let order = await Order.findOne({cryptoSessionToken: token});
        if (!order) {
            return next(errorHandler(404, "Invalid Session Token"))
        }
        if (order.paymentStatus === "paid") {
            return next(errorHandler(403, "This order has already been completed"));
        }

        res.status(200).json({
            success: true
        })
    } catch (e) {
        console.log(e);
        return next(errorHandler(500, "Cannot Verify Payment, Internal Server Error"));
    }
}

export const generateReceiptForPurchase = async (req, res, next) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const {userId, courseId} = req.params;
        const purchase = await Order.findOne({userId, courseId});
        if (!purchase && purchase?.paymentStatus === "Not Paid") {
            return next(errorHandler(404, "Purchase not found"));
        }
        const paymentMode = purchase?.paymentMethod === "amazon_pay" ? "Amazon Pay" : "Visa Card"
        const doc = new pdfDocument();
        const filePath = path.join(__dirname, `receipt_${purchase?._id}.pdf`);
        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);

        doc.fontSize(18).font('Helvetica-Bold').text("Course Purchase Receipt", { align: "center" }); // Bold title
        doc.moveDown();

        doc.fontSize(16).font('Helvetica').text(`UserId: ${purchase.userId}`); // Regular text
        doc.text(`Email: ${purchase.userEmail}`);
        doc.text(`Course: ${purchase.courseTitle}`);
        doc.text(`Amount Paid: $${purchase.coursePricing}`);
        doc.moveDown();

        doc.text("Thank you for your purchase!", { align: "center" });

        // Finalize the PDF
        doc.end();

        // Wait for the file to be written
        await new Promise((resolve, reject) => {
            writeStream.on("finish", resolve);
            writeStream.on("error", reject);
        });

        //upload to cloudinary
        const data = await uploadToMedia(filePath, "raw");
        console.log(data);
        purchase.receiptURL = data?.secure_url;
        await StudentCourse.findByIdAndUpdate(userId);
        await purchase.save()
        const result = await StudentCourse.updateOne(
            {userId, "courses.courseId": courseId},
            {$set: {"courses.$.receiptURL": data?.secure_url}}
        );
        fs.unlinkSync(filePath)
        res.status(200).json({success: true, receiptURL: data?.secure_url, message: "Receipt generated"});
    } catch (e) {
        console.log(e);
        return next(errorHandler(500, "Cannot Verify Payment, Internal Server Error"));
    }
}