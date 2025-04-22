import mongoose from "mongoose";

const skillsSchema = mongoose.Schema({
    skill: {
        type: String,
        required: true
    },
    no_of_jobs: {
        type: Number,
        default: 0
    }
})

const Skills = mongoose.model("skills", skillsSchema);

export default Skills;