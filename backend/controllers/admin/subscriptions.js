import Packages from "../../model/packageSchema.js";

async function getAdminSubscriptions(request, response) {
    try {
        const result = await Packages.find({ delete_status: "false" });

        return response.status(200).json(result);
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function addAdminSubscriptions(request, response) {
    try {
        const sub = request.body;

        await Packages.create(sub);

        return response.status(200).json({ message: "Subscription Created Successfully." });
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function deleteAdminSubscriptions(request, response) {
    try {
        const { _id } = request.headers;

        await Packages.updateOne({ _id }, { delete_status: true });

        return response.status(200).json({ message: "Package Deleted Successfully." });
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

export { getAdminSubscriptions, addAdminSubscriptions, deleteAdminSubscriptions }