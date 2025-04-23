import Jobs from "../../model/jobSchema.js";

async function getAdminJobs(request, response) {
    try {
        const jobs = await Jobs.find({}).sort({"_id": -1});

        return response.status(200).json(jobs);
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function updateAdminJobs(request, response) {
    try {
        const { _id, updatedStatus } = request.body;

        await Jobs.updateOne({ _id }, { job_status: updatedStatus });

        return response.status(200).json({ message: "Job Status Updated Successfully." });
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

export { getAdminJobs, updateAdminJobs }