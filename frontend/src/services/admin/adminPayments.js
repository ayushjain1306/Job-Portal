import axios from "axios";
import { URL } from "../../utils/backendUrl";

async function getAllPayments() {
    try {
        const { data } = await axios.get(`${URL}/admin-get-all-payments`, { withCredentials: true });

        return data;
    }
    catch (error) {
        return [];
    }
}

export { getAllPayments }