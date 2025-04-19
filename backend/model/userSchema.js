import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    skills: {
        type: Array,
        default: []
    },
    resume: {
        type: String,
        default: ""
    }
});

const User = mongoose.model("user", userSchema);

export default User;