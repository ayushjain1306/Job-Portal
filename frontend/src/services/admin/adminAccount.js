import axios from "axios";
import { URL } from "../../utils/backendUrl";

async function getAdminData() {
    try {
        const { data } = await axios.get(`${URL}/admin-get-account-details`, { withCredentials: true });

        return data;
    }
    catch (error) {
        return null;
    }
}

async function adminLogin(loginData) {
    try {
        await axios.post(`${URL}/admin-login`, loginData, { withCredentials: true });

        return true;
    }
    catch (error) {
        return false;
    }
}

async function adminLogout() {
    try {
        await axios.delete(`${URL}/admin-logout`, { withCredentials: true });

        return true;
    }
    catch (error) {
        return false;
    }
}

export { getAdminData, adminLogin, adminLogout }