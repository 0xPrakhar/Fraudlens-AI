import { Router } from "express";
const textRoutes = Router()
import {verifyFirebaseUser} from "../middleware/auth.middlewar.js"
import {textScanner} from '../controllers/text.controller.js'


textRoutes.post(
    "/scan",
    verifyFirebaseUser,
    textScanner
);



export default textRoutes;