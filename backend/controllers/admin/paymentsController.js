import Payments from "../../model/paymentSchema.js";

async function getAllPayments(request, response) {
    try {
        const payments = await Payments.find().populate({
            path: "employer_id",
            select: "name company_name"
        }).populate({
            path: "plan_id",
            select: "package_name"
        });

        return response.status(200).json(payments);
    }
    catch (error) {
        return response.status(500).json({ message: error.message })
    }
}

export { getAllPayments }