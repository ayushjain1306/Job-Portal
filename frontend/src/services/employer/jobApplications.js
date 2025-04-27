import axios from "axios";
import { URL } from "../../utils/backendUrl";

async function getJobApplications(jobId) {
    try {
        const { data } = await axios.get(`${URL}/employer-get-job-applications`, { headers: { id: jobId }, withCredentials: true });

        return data;
    }
    catch (error) {
        return [];
    }
}

async function shortlistApplication(applicationId) {
    try {
        await axios.post(`${URL}/employer-shortlist-application`, { id: applicationId } , { withCredentials: true });

        return true;
    }
    catch (error) {
        return false;
    }
}

async function hireApplication(applicationId, jobId) {
    try {
        await axios.post(`${URL}/employer-hire-application`, { id: applicationId, jobId } , { withCredentials: true });

        return true;
    }
    catch (error) {
        return false;
    }
}

export { getJobApplications, shortlistApplication, hireApplication }