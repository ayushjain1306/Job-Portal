import Admin from "../../model/adminSchema.js";
import jwt from "jsonwebtoken";

function generateToken(username) {
    const token = jwt.sign({ username }, process.env.JWT_ADMIN_SECURITY_KEY, { expiresIn: '1h' });

    return token;
}

async function adminLogin(request, response) {
    try {
        const { username, password } = request.body;

        const admin = await Admin.findOne({ username, password });

        if (!admin) {
            return response.status(404).json({ message: "Admin Not Found." });
        }

        const token = generateToken(username);

        response.cookie("token", token, {
            httpOnly: "true",
            secure: true,
            sameSite: "none"
        })

        return response.status(200).json({ message: "Admin Logged In Successfully." });
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function adminLogout(request, response) {
    try {
        response.cookie("token", token, {
            httpOnly: "true",
            secure: true,
            sameSite: "none"
        })

        return response.status(200).json({ message: "Admin Logged Out Successfully." });
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function getAdminAccountDetails(request, response) {
    try {
        const username = request.username;

        const admin = await Admin.findOne({ username }, "-password");

        return response.status(200).json(admin);
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

async function changeAdminCredentials(request, response) {
    try {
        const username = request.username;

        const admin = await Admin.findOne({ username });

        const { password, credentials } = request.body;

        if (admin.password !== password) {
            return response.status(403).json({ message: "Invalid Password." });
        }

        await Admin.updateOne({ _id: admin._id }, credentials);

        return response.status(200).json({ message: "Credentials Updated Successfully." });
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

export { adminLogin, adminLogout, getAdminAccountDetails, changeAdminCredentials }