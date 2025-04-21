import Employer from "../../model/employerSchema.js";
import jwt from "jsonwebtoken";

function generateToken(email) {
    const token = jwt.sign({ email }, process.env.JWT_EMPLOYER_SECURITY_KEY, { expiresIn: "1h" });

    return token;
}

async function login(request, response) {
    try {
        const { email, password } = request.body;

        const employer = await Employer.findOne({ email, password });

        if (!employer) {
            return response.status(404).json({ message: "User Not Found." });
        }
        
        const token = generateToken(email);

        response.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        return response.status(200).json({ message: "User Logged In Successfully." })
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function logout(request, response) {
    try {
        response.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        return response.status(200).json({ message: "User Logged Out Successfully." })
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function registration(request, response) {
    try {
        const regisDetails = request.body;

        const check1 = await Employer.findOne({ email: regisDetails.email });

        if (check1) {
            return response.status(403).json({ message: "Email Already Existed." })
        }

        const check2 = await Employer.findOne({ phone: regisDetails.phone });

        if (check2) {
            return response.status(403).json({ message: "Phone Number Already Existed." })
        }

        await Employer.create(regisDetails);

        return response.status(200).json({ message: "User Registered Successfully." })
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function getEmployerDetails(request, response) {
    try {
        const email = request.email;

        const employer = await Employer.findOne({ email }, "-password");

        return response.status(200).json(employer);
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

export { login, logout, registration, getEmployerDetails }