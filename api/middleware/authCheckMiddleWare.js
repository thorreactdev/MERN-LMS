import { errorHandler } from "../helper/errorHandler.js";
import jwt from "jsonwebtoken";

export const authCheckUser = async (req, res, next) => {
    try {
        const token = req?.cookies?.token;
        console.log(token);
        // Check if token is missing
        if (!token) {
            return next(errorHandler(401, "Token Not Found"));
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return next(errorHandler(401, "Token Expired"));
                }
                if (err.name === "JsonWebTokenError") {
                    return next(errorHandler(401, "Invalid Token"));
                }
                // Any other error (unusual cases)
                return next(errorHandler(403, "Failed to authenticate."));
            }

            // Attach user to request if token is valid
            req.user = user;
            next();
        });
    } catch (e) {
        return next(errorHandler(500, "Failed to authenticate."));
    }
};
