import axios from "axios";
import { URL } from "../../utils/backendUrl";

async function addExperience(experience) {
    try {
        await axios.post(`${URL}/user-add-experience`, experience, { withCredentials: true });

        return true;
    }
    catch (error) {
        return false;
    }
}

async function addSkill(skill) {
    try {
        await axios.post(`${URL}/user-add-skill`, skill, { withCredentials: true });

        return true;
    }
    catch (error) {
        return false;
    }
}

async function addEducation(education) {
    try {
        await axios.post(`${URL}/user-add-education`, education, { withCredentials: true });

        return true;
    }
    catch (error) {
        return false;
    }
}

async function addProject(project) {
    try {
        await axios.post(`${URL}/user-add-project`, project, { withCredentials: true });

        return true;
    }
    catch (error) {
        return false;
    }
}

async function deleteExperience(experience) {
    try {
        await axios.delete(`${URL}/user-delete-experience`, experience, { withCredentials: true });

        return true;
    }
    catch (error) {
        return false;
    }
}

async function deleteSkill(skill) {
    try {
        await axios.delete(`${URL}/user-delete-skill`, skill, { withCredentials: true });

        return true;
    }
    catch (error) {
        return false;
    }
}

async function deleteEducation(education) {
    try {
        await axios.delete(`${URL}/user-delete-education`, education, { withCredentials: true });

        return true;
    }
    catch (error) {
        return false;
    }
}

async function deleteProject(project) {
    try {
        await axios.delete(`${URL}/user-delete-project`, project, { withCredentials: true });

        return true;
    }
    catch (error) {
        return false;
    }
}

export { addEducation, addExperience, addSkill, addProject, deleteEducation, deleteExperience, deleteProject, deleteSkill }