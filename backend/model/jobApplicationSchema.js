import mongoose from "mongoose";
import Job from "./jobSchema.js";
import User from "./userSchema.js";

const jobSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: User
    },
    cover_letter: {
        type: String,
        required: true
    },
    answers_to_questions: {
        type: String,
        required: true
    },
    job_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Job
    },
    application_status: {
        type: "String",
        default: "Pending"
    }
});

const JobApplications = mongoose.model("jobapplication", jobSchema);

export default JobApplications;