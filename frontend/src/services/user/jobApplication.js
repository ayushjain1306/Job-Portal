import axios from "axios";
import { URL } from "../../utils/backendUrl";

async function applyJob(data) {
    try {
        await axios.post(`${URL}/user-apply-to-job`, data, { withCredentials: true });

        return true;
    }
    catch (error) {
        return false;
    }
}

async function checkApplication(jobId) {
    try {
        const { data } = await axios.post(`${URL}/user-check-application`, { jobId }, { withCredentials: true });

        return data.status;
    }
    catch (error) {
        return false;
    }
}

export { applyJob, checkApplication }