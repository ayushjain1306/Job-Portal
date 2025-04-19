import jwt from "jsonwebtoken";

function adminAuth(request, response, next) {
    const token = request.cookies.token;

    if (token) {
        try {
            const decodedResult = jwt.verify(token, process.env.JWT_ADMIN_SECURITY_KEY);

            request.username = decodedResult.username;

            next();
        }
        catch (error) {
            return response.status(403).json({ message: "Invalid Token." });
        }
    }
    else return response.status(404).json({ message: "Token Not Found." });
}

export default adminAuth;