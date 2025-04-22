import axios from "axios";
import { URL } from "../../utils/backendUrl";

async function getAllPlans() {
    try {
        const { data } = await axios.get(`${URL}/employer-get-all-subscription-plans`, { withCredentials: true });

        return data;
    }
    catch (error) {
        return null;
    }
}

async function purchasePlan(paymentDetails) {
    try {
        await axios.post(`${URL}/employer-purchase-subscription`, paymentDetails, { withCredentials: true });

        return true;
    }
    catch (error) {
        return false;
    }
}

export { getAllPlans, purchasePlan }