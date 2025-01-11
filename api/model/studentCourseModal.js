import mongoose from "mongoose";
const studentCoursesSchema = new mongoose.Schema({
    userId: String,
    courses: [
        {
            courseId: String,
            title: String,
            instructorId: String,
            instructorName: String,
            dateOfPurchase: Date,
            courseImage: String,
            receiptURL : String,
        },
    ],
});

const StudentCourse = mongoose.model('StudentCourse', studentCoursesSchema);
export default StudentCourse;