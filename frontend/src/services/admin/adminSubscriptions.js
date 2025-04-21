import axios from "axios";
import { URL } from "../../utils/backendUrl";

async function getSubs() {
    try {
        const { data } = await axios.get(`${URL}/admin-get-subscriptions`, { withCredentials: true });

        return data;
    }
    catch (error) {
        return [];
    }
}

async function addSubs(data) {
    try {
        await axios.post(`${URL}/admin-add-subscription`, data, { withCredentials: true });

        return true;
    }
    catch (error) {
        return false;
    }
}

async function deleteSubs(_id) {
    try {
        await axios.delete(`${URL}/admin-delete-subscription`, {
            headers: { _id },
            withCredentials: true
        })

        return true;
    }
    catch (error) {
        return false;
    }
}

export { getSubs, addSubs, deleteSubs }