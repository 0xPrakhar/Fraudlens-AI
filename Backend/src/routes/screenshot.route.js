import { Router } from "express";
import {upload} from "../middleware/multer.middleware.js"
import screenshotScanner from '../controllers/screenshot.controller.js'
const ScreenShotRoutes = Router()

import {verifyFirebaseUser} from "../middleware/auth.middlewar.js";



ScreenShotRoutes.post(
    "/scan",
    verifyFirebaseUser,
    upload.single("image"),
    screenshotScanner
);


export default ScreenShotRoutes;