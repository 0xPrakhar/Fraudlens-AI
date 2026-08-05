import { auth } from "../config/firebase.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utiles/ApiError.js";

export const verifyFirebaseUser = async (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Authorization token missing");
    }

    // Extract Firebase ID Token
    const idToken = authHeader.split(" ")[1];

    console.log("Token received");

    // Verify Firebase Token
    const decodedToken = await auth.verifyIdToken(idToken);

    console.log("✅ Firebase token verified");
    console.log(decodedToken);

    // Find user
    let user = await User.findOne({
      firebaseUid: decodedToken.uid,
    });

    console.log("User found:", user);

    // Create user if first login
    if (!user) {
      console.log("Creating new user...");

      user = await User.create({
        firebaseUid: decodedToken.uid,
        email: decodedToken.email,
        fullName: decodedToken.name || "User",
        avatar: decodedToken.picture || "",
      });

      console.log("✅ User created:", user);
    }

    req.user = user;

    console.log("Middleware completed");

    next();
  } catch (error) {
    console.error("🔥 REAL ERROR:");
    console.error(error);

    // Firebase authentication error
    if (
      error.code?.startsWith("auth/") ||
      error.code === "auth/id-token-expired" ||
      error.code === "auth/argument-error"
    ) {
      return next(new ApiError(401, "Invalid or expired Firebase token"));
    }

    // Pass every other error to the global error handler
    return next(error);
  }
};