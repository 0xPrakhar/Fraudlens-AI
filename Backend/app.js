import express from "express";
import urlRoutes from "./src/routes/url.route.js";
import textRoutes from "./src/routes/text.route.js";
import ScreenShotRoutes from "./src/routes/screenshot.route.js";
import historyRoutes from './src/routes/history.route.js'
import cors from "cors";
import cookieParser from "cookie-parser";
import authrouter from './src/routes/auth.route.js'
import QrRoutes from "./src/routes/qr.route.js";

const app = express();



const allowedOrigins = process.env.CORS_ORIGIN.split(',');

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));


// Parse JSON
app.use(express.json({ limit: "16kb" }));

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files 
app.use(express.static("public"));

// Parse cookies
app.use(cookieParser());


app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "FraudLens API is running "
    });
});
//All the important routes
app.use('/api/v1/url',urlRoutes)
app.use('/api/v1/text',textRoutes)
app.use('/api/v1/qr',QrRoutes)
app.use('/api/v1/screenshot',ScreenShotRoutes)
app.use('/api/v1/history',historyRoutes)
app.use('/api/v1/auth',authrouter)


export default app;