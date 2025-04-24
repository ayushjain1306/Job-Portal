import axios from "axios";
import { URL } from "../../utils/backendUrl";

async function userLogin(loginDetails) {
    try {
        await axios.post(`${URL}/user-login`, loginDetails, { withCredentials: true });

        return true;
    }
    catch (error) {
        return false;
    }
}

async function userSignup(signupDetails) {
    try {
        await axios.post(`${URL}/user-signup`, signupDetails);

        return true;
    }
    catch (error) {
        if (error.response.data.message === "Email Already Exists.") return "Email Already Exists."
        if (error.response.data.message === "Phone Number Already Exists.") return "Phone Number Already Exists."
        return false;
    }
}

async function userLogout() {
    try {
        await axios.delete(`${URL}/user-logout`, { withCredentials: true });

        return true;
    }
    catch (error) {
        return false;
    }
}

async function getUserDetails() {
    try {
        const { data } = await axios.get(`${URL}/user-get-account-details`, { withCredentials: true });

        return data;
    }
    catch (error) {
        return null;
    }
}

export { userLogin, userSignup, userLogout, getUserDetails }