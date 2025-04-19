import jwt from "jsonwebtoken";

function userAuth(request, response, next) {
    const token = request.cookies.token;

    if (token) {
        try {
            const decodedResult = jwt.verify(token, process.env.JWT_SECURITY_KEY);

            request.email = decodedResult.email;

            next();
        }
        catch (error) {
            return response.status(403).json({ message: "Invalid Token." });
        }
    }
    else return response.status(404).json({ message: "Token Not Found." });
}

export default userAuth;