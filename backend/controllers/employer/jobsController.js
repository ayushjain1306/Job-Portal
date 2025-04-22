import Jobs from "../../model/jobSchema.js";
import Employer from "../../model/employerSchema.js";

async function getEmployerJobs(request, response) {
    try {
        const email = request.email;

        const employer = await Employer.findOne({ email });

        const result = await Jobs.find({ employer_id: employer._id });

        return response.status(200).json(result);
    }
    catch (error){
        return response.status(500).json({ message: error.message });
    }
}

async function addEmployerJob(request, response) {
    try {
        const email = request.email;

        const employer = await Employer.findOne({ email });

        const jobDetails = request.body;

        await Jobs.create({ ...jobDetails, employer_id: employer._id });

        return response.status(200).json({ message: "Job Created Successfully." });
    }
    catch (error){
        return response.status(500).json({ message: error.message });
    }
}

async function changeJobStatus(request, response) {
    try {
        const { id } = request.body;

        await Jobs.updateOne({ _id: id }, { close_status: true });

        return response.status(200).json({ message: "Job Closed Successfully." });
    }
    catch (error){
        return response.status(500).json({ message: error.message });
    }
}

export { getEmployerJobs, addEmployerJob, changeJobStatus }