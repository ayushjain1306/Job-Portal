import JobApplications from "../../model/jobApplicationSchema.js";
import Jobs from "../../model/jobSchema.js";

async function getJobApplications(request, response) {
    try {
        const { id } = request.headers;

        const data = await JobApplications.find({ job_id: id }).populate("user_id", "-password").populate("job_id", "questions");

        return response.status(200).json(data);
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function shortlistApplication(request, response) {
    try {
        const { id } = request.body;

        await JobApplications.updateOne({ _id: id }, { application_status: "Shortlisted" });

        return response.status(200).json({ message: "Job Application Shortlisted Successfully." });
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function hireApplication(request, response) {
    try {
        const { id, jobId } = request.body;

        await JobApplications.updateOne({ _id: id }, { application_status: "Hired" });

        await Jobs.updateOne({ _id: jobId }, { close_status: true });

        return response.status(200).json({ message: "Job Application Hired Successfully." });
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

export { getJobApplications, shortlistApplication, hireApplication }