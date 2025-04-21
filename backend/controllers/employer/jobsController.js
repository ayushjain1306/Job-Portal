import Jobs from "../../model/jobSchema.js";
import Employer from "../../model/employerSchema.js";

async function getEmployerJobs() {
    try {
        const { email } = request.username;

        const employer = await Employer.findOne({ email });

        const result = await Jobs.find({ employer_id: employer._id });

        return response.status(200).json(result);
    }
    catch (error){
        return response.status(500).json({ message: error.message });
    }
}

async function addEmployerJob() {
    try {
        const { email } = request.username;

        const employer = await Employer.findOne({ email });

        const jobDetails = request.body;

        const result = await Jobs.create({ ...jobDetails, employer_id: employer._id });

        return response.status(200).json({ message: "Job Created Successfully." });
    }
    catch (error){
        return response.status(500).json({ message: error.message });
    }
}

export { getEmployerJobs, addEmployerJob }