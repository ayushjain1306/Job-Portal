import axios from "axios";
import { URL } from "../../utils/backendUrl";

async function getJobs() {
    try {
        const result = await axios.get(`${URL}/admin-get-all-jobs`, { withCredentials: true });

        return result.data;
    }
    catch (error) {
        return [];
    }
}

async function updateJobs(id, updatedStatus) {
    try {
        await axios.put(`${URL}/admin-update-job-status`, { _id: id, updatedStatus }, { withCredentials: true });

        return true;
    }
    catch (error) {
        return false;
    }
}

export { getJobs, updateJobs }