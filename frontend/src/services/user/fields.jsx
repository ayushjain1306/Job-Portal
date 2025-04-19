import axios from "axios";
import { URL } from "../../utils/backendUrl";

async function getFields() {
    try {
        const result = await axios.get(`${URL}/get-top-fields`);

        return result;
    }
    catch (error) {
        return [];
    }
}

export {
    getFields
}