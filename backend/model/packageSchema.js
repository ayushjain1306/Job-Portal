import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    package_name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    months: {
        type: Number,
        required: true
    }
});

const Packages = mongoose.model("package", packageSchema);

export default Packages;