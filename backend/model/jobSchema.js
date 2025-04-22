import mongoose from "mongoose";
import Employer from "./employerSchema.js";

const jobSchema = new mongoose.Schema({
    job_title: {
        type: String,
        required: true
    },
    job_description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        default: 0
    },
    questions: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    employer_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Employer
    },
    job_status: {
        type: String,
        default: "Pending"
    },
    skills: {
        type: Array,
        required: true
    },
    close_status: {
        type: Boolean,
        default: false
    }
});

const Jobs = mongoose.model("job", jobSchema);

export default Jobs;