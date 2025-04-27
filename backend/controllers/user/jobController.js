import Jobs from "../../model/jobSchema.js";

async function searchJobs(request, response) {
    try {
        const { data } = request.body;

        let jobs = await Jobs.find({
            job_status: "Approved", close_status: false,
            $or: [
                { skills: data.job },
                { job_title: { $regex: data.job, $options: "i" } }
            ]
        }).populate("employer_id", "company_name");

        if (data.location !== ""){
            jobs = jobs.filter((job) => job.location.toLowerCase() === data.location.toLowerCase());
        }

        if (data.experience !== "") {
            if (data.experience === "Fresher") {
                jobs = jobs.filter((job) => job.experience_required === 0);
            }
        }

        return response.status(200).json(jobs);
    }
    catch (error){
        return response.status(500).json({ message: error.message });
    }
}

async function topJobs(request, response) {
    try {
        const jobs = await Jobs.find({ job_status: "Approved", close_status: false }).populate("employer_id", "company_name").sort({ _id: -1 }).limit(12);

        return response.status(200).json(jobs);
    }
    catch (error){
        return response.status(500).json({ message: error.message });
    }
}

async function getJobDetails(request, response) {
    try {
        const { id } = request.headers;

        const jobs = await Jobs.findOne({ _id: id, job_status: "Approved", close_status: false }).populate("employer_id", "company_name");

        return response.status(200).json(jobs);
    }
    catch (error){
        return response.status(500).json({ message: error.message });
    }
}

export { searchJobs, topJobs, getJobDetails };