import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    title: { type: String, required: true },
    videoURL: { type: String, required: true },
    public_id : { type: String, required: true },
    freePreview : { type: Boolean, required: true },
})

const courseSchema = new mongoose.Schema({
    adminID : {
        type: String,
        required: true,
        ref : "User"
    },
    instructorName : {
        type: String,
        required: true,
    },
    courseTitle : {
        type: String,
        required: true,
    },
    category : {
        type: String,
        required: true,
    },
    level : {
        type: String,
        required: true,
    },
    primaryLanguage : {
        type: String,
        required: true,
    },
    subtitle : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    image :{
        type: String,
        required: true,
    },
    welcomeMessage : {
        type: String,
        required: true,
    },
    pricing : {
        type : Number,
        required: true,
    },
    disCountedPrice:{
        type : Number,
        required: true,
    },
    objectives : {
        type : String,
        required : true,
    },
    public_id : {
        type : String,
        required : true,
    },
    students :[
        {
            studentID : String,
            studentName : String,
            studentEmail : String,
            paidAmount : String,
        },
    ],
    curriculum : [lectureSchema],
    isPublished : Boolean
}, { timestamps : true});

const Course = mongoose.model("Course", courseSchema);
export default Course;