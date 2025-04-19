import Users from "../../model/userSchema.js";
import jwt from "jsonwebtoken";

function generateToken(email) {
    const token = jwt.sign({ email }, process.env.JWT_SECURITY_KEY, { expiresIn: '1h' });
}

async function login(request, response) {
    try {
        const { email, password } = request.body;

        const user = await Users.findOne({ email, password });

        if (!user){
            return response.status(404).json("Invalid Credentials.");
        }

        const token = generateToken(email);

        response.cookie("token", token, {
            httpOnly: "true",
            secure: true,
            sameSite: "none"
        })

        return response.status(200).json({ message: "User Logged In Successfully." });
    }
    catch (error){
        return response.status(500).json({ message: error.message });
    }
}

async function signup(request, response) {
    try {
        const { email, password, name, phone } = request.body;

        const check1 = await Users.findOne({ email });

        if (check1){
            return response.status(404).json("Email Already Exists.");
        }

        const check2 = await Users.findOne({ email });

        if (check2){
            return response.status(404).json("Phone Number Already Exists.");
        }

        await Users.create({ name, email, phone, password });

        return response.status(200).json({ message: "User Account Created Successfully." });
    }
    catch (error){
        return response.status(500).json({ message: error.message });
    }
}

async function logout(request, response) {
    try {
        response.clearCookie("token", {
            httpOnly: "true",
            secure: true,
            sameSite: "none"
        })

        return response.status(200).json({ message: "User Logged Out Successfully." });
    }
    catch (error){
        return response.status(500).json({ message: error.message });
    }
}

export { login, signup, logout }