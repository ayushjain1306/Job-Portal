import mongoose from "mongoose";

const employerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    company_address: {
        type: String,
        required: true
    },
    company_website: {
        type: String,
        required: true
    }
});

const Employer = mongoose.model("employer", employerSchema);

export default Employer;