import { auth } from "../config/firebase.js";
import { User } from "../models/user.model.js"; // Assuming a User model exists at this path
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyFirebaseToken = asyncHandler(async (req, _, next) => {
    // 1. Get token from Authorization header (e.g., "Bearer <token>")
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        throw new ApiError(401, "Unauthorized request: No token provided");
    }

    try {
        // 2. Verify the token using Firebase Admin SDK
        const decodedToken = await auth.verifyIdToken(token);
        if (!decodedToken) {
            throw new ApiError(401, "Unauthorized: Invalid token");
        }

        // 3. Find the user in your local MongoDB database using the Firebase UID
        // Note: Ensure your User model has a 'firebaseUid' field to store the UID from Firebase.
        const user = await User.findOne({ firebaseUid: decodedToken.uid }).select("-password");

        if (!user) {
            throw new ApiError(404, "User not found in our system. Please complete registration.");
        }

        // 4. Attach the local user object to the request
        req.user = user;
        
        next();
    } catch (error) {
        // Handle specific Firebase auth errors or re-throw
        const errorMessage = error.code === 'auth/id-token-expired' ? "Token has expired, please log in again." : "Invalid access token.";
        throw new ApiError(401, error?.message || errorMessage);
    }
});