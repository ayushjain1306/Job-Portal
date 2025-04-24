import User from "../../model/userSchema.js";

async function addExperience(request, response) {
    try {
        const email = request.email;

        const experience = request.body;
        
        const user = await User.findOneAndUpdate({ email }, { $push: { experience: experience } }, { new: true });
        
        return response.status(200).json({ message: "Experience Added Successfully." });
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function addEducation(request, response) {
    try {
        const email = request.email;

        const education = request.body;
        
        const user = await User.findOneAndUpdate({ email }, { $push: { education: education } }, { new: true });
        
        return response.status(200).json({ message: "Education Added Successfully." });
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function addSkill(request, response) {
    try {
        const email = request.email;

        const skill = request.body;
        
        const user = await User.findOneAndUpdate({ email }, { $push: { skill: skill } }, { new: true });
        
        return response.status(200).json({ message: "Skill Added Successfully." });
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function addProject(request, response) {
    try {
        const email = request.email;

        const project = request.body;
        
        const user = await User.findOneAndUpdate({ email }, { $push: { projects: project } }, { new: true });
        
        return response.status(200).json({ message: "Project Added Successfully." });
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function deleteSkill(request, response) {
    try {
        const skillId = request.headers.id;
        const email = request.email;

        const skill = request.body;
        
        const user = await User.findOneAndUpdate({ email }, { $pull: { skill: { _id: skillId } } }, { new: true });
        
        return response.status(200).json({ message: "Skill Deleted Successfully." });
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function deleteProject(request, response) {
    try {
        const projectId = request.headers.id;
        const email = request.email;

        const project = request.body;
        
        const user = await User.findOneAndUpdate({ email }, { $pull: { projects: { _id: projectId } } }, { new: true });
        
        return response.status(200).json({ message: "Project Deleted Successfully." });
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function deleteEducation(request, response) {
    try {
        const educationId = request.headers.id;
        const email = request.email;

        const education = request.body;
        
        const user = await User.findOneAndUpdate({ email }, { $pull: { education: { _id: educationId } } }, { new: true });
        
        return response.status(200).json({ message: "Education Deleted Successfully." });
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function deleteExperience(request, response) {
    try {
        const experienceId = request.headers.id;
        const email = request.email;

        const experience = request.body;
        
        const user = await User.findOneAndUpdate({ email }, { $pull: { experience: { _id: experienceId } } }, { new: true });
        
        return response.status(200).json({ message: "Experience Deleted Successfully." });
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

export { addEducation, addExperience, addSkill, addProject, deleteEducation, deleteExperience, deleteSkill, deleteProject }