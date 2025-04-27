import axios from "axios";
import { URL } from "../../utils/backendUrl";

async function topJobs() {
    try {
        const { data } = await axios.get(`${URL}/user-get-top-jobs`);

        return data;
    }
    catch (error) {
        return [];
    }
}

async function searchedJobs(params) {
    try {
        const { data } = await axios.post(`${URL}/user-get-searched-jobs`, {data: params});

        return data;
    }
    catch (error) {
        return [];
    }
}

async function getJobDetails(id) {
    try {
        const { data } = await axios.get(`${URL}/user-get-job-detail`, { headers: { id } });

        return data;
    }
    catch (error) {
        return null;
    }
}

export { topJobs, searchedJobs, getJobDetails }