import axios from "axios";
import { URL } from "../../utils/backendUrl";

async function login(loginDetails){
    try {
        await axios.post(`${URL}/employer-login`, loginDetails, { withCredentials: true });

        return true;
    }
    catch (error){
        return false;
    }
}

async function logout(){
    try {
        await axios.delete(`${URL}/employer-logout`, { withCredentials: true });

        return true;
    }
    catch (error){
        return false;
    }
}

async function registration(regisDetails){
    try {
        await axios.post(`${URL}/employer-registration`, regisDetails);

        return true;
    }
    catch (error){
        if (error.response.data.message === "Email Already Existed.") return "Email Already Existed."
        else if (error.response.data.message === "Phone Number Already Existed.") return "Phone Number Already Existed."
        else false;
    }
}

async function getEmployerDetails(){
    try {
        const { data } = await axios.get(`${URL}/employer-get-details`, { withCredentials: true });

        return data;
    }
    catch (error){
        return null;
    }
}

export { login, logout, registration, getEmployerDetails }