import Employer from "../../model/employerSchema.js";
import Packages from "../../model/packageSchema.js";
import Payments from "../../model/paymentSchema.js";

function addMonth(months) {
    const date = new Date();

    date.setMonth(date.getMonth() + months);

    return date;
}

async function getSubsriptionPlans(request, response) {
    try {
        const email = request.email;

        const employer = await Employer.findOne({ email });

        let output = { currentPlan: null, otherPlans: [], expired: true }

        if (employer.subscription_plan !== "") {
            const result = await Packages.findOne({ _id: employer.subscription_plan });

            if (new Date(employer.last_date_plan) >= new Date()){
                output = { ...output, currentPlan: result, expired: false }
            }
            else {
                output = { ...output, currentPlan: result, expired: true }
            }
        }

        const otherResult = await Packages.find({ delete_status: false });

        output = { ...output, otherPlans: otherResult.filter((plan) => JSON.stringify(plan) !== JSON.stringify(output.currentPlan)) }

        return response.status(200).json(output);
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function payment(request, response) {
    try {
        const email = request.email;

        const employer = await Employer.findOne({ email });

        const paymentDetails = request.body;

        const date = addMonth(paymentDetails.months);

        await Employer.updateOne({ _id: employer._id }, { subscription_plan: paymentDetails.plan_id, last_date_plan: new Date(date) });

        await Payments.create({ employer_id: employer._id, plan_id: paymentDetails.plan_id, amount: paymentDetails.amount });

        return response.status(200).json({ message: "Subscription Purchased Successfully." });
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

export { getSubsriptionPlans, payment }