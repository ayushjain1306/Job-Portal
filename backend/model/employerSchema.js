import mongoose from "mongoose";
import Packages from "./packageSchema.js";

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
        type: String
    },
    subscription_plan: {
        type: mongoose.Schema.ObjectId,
        ref: Packages
    },
    last_date_plan: {
        type: Date,
        default: null
    }
});

const Employer = mongoose.model("employer", employerSchema);

export default Employer;