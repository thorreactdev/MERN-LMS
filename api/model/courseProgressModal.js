import mongoose from "mongoose";

const LectureProgressSchema = new mongoose.Schema({
    lectureId: String,
    viewed: Boolean,
    dateViewed: Date,
});

const CourseProgressSchema = new mongoose.Schema({
    userId: String,
    courseId: String,
    completed: Boolean,
    completionDate: Date,
    lecturesProgress: [LectureProgressSchema],
});

const Progress = mongoose.model("Progress", CourseProgressSchema);
export default Progress;