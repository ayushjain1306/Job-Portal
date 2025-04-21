import axios from "axios";
import { URL } from "../../utils/backendUrl";

async function getEmployerJobs() {
    try {
        const { data } = await axios.get(`${URL}/employer-get-all-jobs`, { withCredentials: true });

        return data;
    }
    catch (error) {
        return [];
    }
}

async function createJob(jobDetails) {
    try {
        await axios.post(`${URL}/employer-add-job`, jobDetails, { withCredentials: true });

        return true;
    }
    catch (error) {
        return false;
    }
}

export { getEmployerJobs, createJob }