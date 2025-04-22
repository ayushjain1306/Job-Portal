import Skills from "../../model/skillSchema.js";

async function addSkill(request, response) {
    try {
        const skill = request.body;

        await Skills.create(skill);

        return response.status(200).json({ message: "Skill Added Successfully." });
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function getSkills(request, response) {
    try {
        const skills = await Skills.find({});

        return response.status(200).json(skills);
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function deleteSkill(request, response) {
    try {
        const { id } = request.headers;

        await Skills.deleteOne({ _id: id });

        return response.status(200).json({ message: "Skill Deleted Successfully." });
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

export { addSkill, getSkills, deleteSkill }