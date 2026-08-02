import express from "express";
import urlRoutes from "./src/routes/url.route.js";
import textRoutes from "./src/routes/text.route.js";
import ScreenShotRoutes from "./src/routes/screenshot.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

// Enable CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Parse JSON
app.use(express.json({ limit: "16kb" }));

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files (optional)
app.use(express.static("public"));

// Parse cookies
app.use(cookieParser());


app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "FraudLens API is running 🚀"
    });
});
//register url 
app.use('/api/v1/url',urlRoutes)
app.use('/api/v1/text',textRoutes)
app.use('/api/v1/screenshot',ScreenShotRoutes)


export default app;