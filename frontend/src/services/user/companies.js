import axios from "axios";
import { URL } from "../../utils/backendUrl";

async function getCompanies() {
    try {
        const result = await axios.get(`${URL}/get-top-companies`);

        return result.data;
    }
    catch (error) {
        return [];
    }
}

export {
    getCompanies
}