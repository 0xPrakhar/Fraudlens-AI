import { Router } from "express";
import {upload} from "../middleware/multer.middleware.js"
import {qrScanner} from '../controllers/qr.controller.js'

const QrRoutes = Router()

import {verifyFirebaseUser} from "../middleware/auth.middlewar.js";



QrRoutes.post(
    "/scan",
    verifyFirebaseUser,
    upload.single("image"),
    qrScanner
);


export default QrRoutes;