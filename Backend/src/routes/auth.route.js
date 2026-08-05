// src/routes/auth.route.js
import express from "express";
import { verifyFirebaseUser } from "../middleware/auth.middlewar.js"; 
import {User} from "../models/user.model.js"; 

const authrouter = express.Router();

// Route: POST /api/v1/auth/sync
authrouter.post("/sync", verifyFirebaseUser, async (req, res) => {
  try {
    // verifyFirebaseUser middleware pehle hi user ko MongoDB mein find/create karke req.user mein dal chuka hai
    res.status(200).json({
      success: true,
      message: "User synced successfully with database",
      user: req.user,
    });
  } catch (error) {
    console.error("Auth sync error:", error);
    res.status(500).json({ success: false, message: "Internal server error during sync" });
  }
});

export default authrouter;