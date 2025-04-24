import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
    institute_name: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    }
})

const experienceSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    end_date: {
        type: Date,
        default: null
    },
    present: {
        type: Boolean,
        default: true
    }
})

const skillSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: true
    }
})

const projectSchema = new mongoose.Schema({
    project_name: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    end_date: {
        type: Date,
        default: null
    },
    present: {
        type: Boolean,
        default: true
    }
})

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
    skills: [skillSchema],
    education: [educationSchema],
    experience: [experienceSchema],
    projects: [projectSchema],
    resume: {
        type: String,
        default: ""
    }
});

const User = mongoose.model("user", userSchema);

export default User;