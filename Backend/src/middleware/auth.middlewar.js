// middlewares/auth.middleware.js

import { auth } from "../config/firebase.js";
import { User } from "../models/user.model.js"; // Update this path
import { ApiError } from "../utiles/ApiError.js";

export const verifyFirebaseUser = async (req, res, next) => {
    try {

        // Get Authorization header
        const authHeader = req.headers.authorization;
        console.log(authHeader)

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(401, "Unauthorized");
        }

      console.log("Authorization Header:", req.headers.authorization);

const idToken = authHeader.split(" ")[1];
console.log("Token received:", idToken.substring(0, 20) + "...");

const decodedToken = await auth.verifyIdToken(idToken);
console.log("Decoded Token:", decodedToken);

        // Find user in MongoDB
        let user = await User.findOne({
            firebaseUid: decodedToken.uid,
        });

        // Create user if first login
        if (!user) {
            user = await User.create({
                firebaseUid: decodedToken.uid,
                email: decodedToken.email,
                fullName: decodedToken.name || "User",
                avatar: decodedToken.picture || "",
            });
        }

        // Attach MongoDB user to request
        req.user = user;

        next();

    } catch (error) {

        if (error instanceof ApiError) {
            return next(error);
        }

        return next(
            new ApiError(401, "Invalid or expired Firebase token")
        );
    }
};