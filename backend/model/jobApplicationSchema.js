import mongoose from "mongoose";
import Job from "./jobSchema.js";
import User from "./userSchema.js";

const jobSchema = new mongoose.Schema({
    applicant: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: User
    },
    cover_letter: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    resume: {
        type: String,
        default: ""
    },
    answers_to_questions: {
        type: Array,
        default: []
    },
    job_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Job
    }
});

const Jobs = mongoose.model("job", jobSchema);

export default Jobs;