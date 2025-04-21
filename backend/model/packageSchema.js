import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    package_name: {
        type: String,
        required: true
    },
    package_description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    months: {
        type: Number,
        required: true
    },
    delete_status: {
        type: Boolean,
        default: false
    }
});

const Packages = mongoose.model("package", packageSchema);

export default Packages;