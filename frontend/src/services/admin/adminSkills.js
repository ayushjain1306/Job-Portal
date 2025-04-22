import axios from "axios";
import { URL } from "../../utils/backendUrl";

async function getAllSkills() {
    try {
        const { data } = await axios.get(`${URL}/admin-get-all-skills`, { withCredentials: true });

        return data;
    }
    catch (error) {
        return [];
    }
}

async function addSkill(skill) {
    try {
        await axios.post(`${URL}/admin-add-skill`, skill, { withCredentials: true });

        return true;
    }
    catch (error) {
        return false;
    }
}

async function deleteSkill(id) {
    try {
        await axios.delete(`${URL}/admin-delete-skill`, { 
            headers: {
                id
            },
            withCredentials: true 
        });

        return true;
    }
    catch (error) {
        return false;
    }
}

export { getAllSkills, addSkill, deleteSkill }