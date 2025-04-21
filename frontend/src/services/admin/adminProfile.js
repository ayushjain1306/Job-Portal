import axios from "axios";
import { URL } from "../../utils/backendUrl";

async function changeCredentials(data) {
    try {
        await axios.put(`${URL}/admin-change-credentials`, data, { withCredentials: true });

        return true;
    }
    catch (error) {
        if (error?.response?.data?.message === "Invalid Password."){
            return "Invalid Password."
        }
        else return false;
    }
}

export { changeCredentials }