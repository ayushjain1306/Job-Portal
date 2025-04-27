import User from "../../model/userSchema.js";
import JobApplications from "../../model/jobApplicationSchema.js";

async function applyToJob(request, response) {
    try {
        const data = request.body;

        const email = request.email;

        const user = await User.findOne({ email });

        await JobApplications.create({ ...data, user_id: user._id });

        return response.status(200).json({ message: "Successfully Applied to Job." });
    }
    catch (error){
        return response.status(500).json({ message: error.message });
    }
}

async function checkJobApplication(request, response) {
    try {
        const { jobId } = request.body;

        const email = request.email;

        const user = await User.findOne({ email });

        const result = await JobApplications.findOne({ job_id: jobId, user_id: user._id });

        return response.status(200).json({ message: "Successfully Checked Job Application.", status: result ? true: false });
    }
    catch (error){
        return response.status(500).json({ message: error.message });
    }
}

export { applyToJob, checkJobApplication }