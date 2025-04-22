import mongoose from "mongoose";
import Employer from "./employerSchema.js";
import Packages from "./packageSchema.js";

const paymentSchema = new mongoose.Schema({
    employer_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Employer
    },
    plan_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Packages
    },
    amount: {
        type: Number,
        required: true
    },
})

const Payments = mongoose.model("payments", paymentSchema);

export default Payments;