import axios from "axios";
import { URL } from "../../utils/backendUrl";

async function getYears() {
    try {
        const { data } = await axios.get(`${URL}/admin-get-years`, { withCredentials: true });

        return data;
    }
    catch (error) {
        return [];
    }
}

async function getTopSellingSubscriptions() {
    try {
        const { data } = await axios.get(`${URL}/admin-get-top-selling-subscriptions`, { withCredentials: true });

        return data;
    }
    catch (error) {
        return [];
    }
}

async function getSalesData() {
    try {
        const { data } = await axios.get(`${URL}/admin-get-sales-data`, { withCredentials: true });

        return data;
    }
    catch (error) {
        return [];
    }
}

async function getDashboardData() {
    try {
        const { data } = await axios.get(`${URL}/admin-get-dashboard-data`, { withCredentials: true });

        return data;
    }
    catch (error) {
        return {};
    }
}

export { getDashboardData, getSalesData, getYears, getTopSellingSubscriptions }