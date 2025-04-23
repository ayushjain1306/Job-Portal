import Payments from "../../model/paymentSchema.js";
import Employer from "../../model/employerSchema.js";
import Users from "../../model/userSchema.js";
import Jobs from "../../model/jobSchema.js";
import Admin from "../../model/adminSchema.js";

async function getDashboardData(request, response) {
    try {
        const employees = await Employer.countDocuments();

        const users = await Users.countDocuments();

        const jobs = await Jobs.countDocuments();

        const payments = await Payments.countDocuments();

        if (payments !== 0) {
            const total_amount = await Payments.aggregate([
                {
                    $group: {
                        _id: null,
                        totalAmount: {$sum: '$amount'}
                    }
                }
            ]);
    
            const result = {
                jobs: jobs,
                users: users,
                employees: employees,
                amount: total_amount[0].totalAmount
            }
    
            return response.status(200).json(result);
        }
        else {
    
            const result = {
                jobs: jobs,
                users: users,
                employees: employees,
                amount: 0
            }
    
            return response.status(200).json(result);
        }
    }   
    catch (error) {
        return response.status(500).json({ message: error.message });
    } 
}

async function getYears(request, response){
    try {
        const username = "ayushjain9518";

        const adminData = await Admin.findOne({username});

        const startYear = new Date(adminData.date_created).getFullYear();

        const currentYear = new Date(Date.now()).getFullYear();

        const years = [...Array(currentYear-startYear).keys()].map((x => x + startYear));

        return response.status(200).json([...years, currentYear]);
    } 
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function getSalesData(request, response){
    try {
        const salesData = await Payments.find({});

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const monthlySales = salesData.reduce((acc, sale) => {
            const month = sale.date_created.getMonth();
            const year = sale.date_created.getFullYear();

            if (acc[year]){
                const element = acc[year].find((x) => x.month === months[month]);

                if (element){
                    element.sale += sale.amount;
                }
                else {
                    acc[year].push({month: months[month], sale: sale.amount})
                }
            }
            else {
                acc[year] = [];
                acc[year].push({month: months[month], sale: sale.amount})
            }

            return acc;
        }, {})

        return response.status(200).json(monthlySales);
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

async function getTopSellingSubscriptions(request, response){
    try {
        const topSellingSubscriptions = await Payments.aggregate([
            {
                $lookup : {
                    from: "packages",
                    localField: 'plan_id',
                    foreignField: "_id",
                    as: "plan_id"
                }
            },
            {
                $unwind: "$plan_id"
            },
            {
                $group: {
                    _id: "$plan_id.package_name",
                    totalSales: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    totalSales: -1
                }
            },
            {
                $limit: 5
            }
        ])

        return response.status(200).json(topSellingSubscriptions);
    }
    catch (error){
        return response.status(500).json({message: error.message});
    }
}

export { getDashboardData, getYears, getSalesData, getTopSellingSubscriptions }