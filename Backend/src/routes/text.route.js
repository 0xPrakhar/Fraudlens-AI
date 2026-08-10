import { Router } from "express";
const textRoutes = Router()
import {verifyFirebaseUser} from "../middleware/auth.middlewar"
import {textScanner} from '../controllers/text.controller.js'


router.post(
    "/text",
    verifyFirebaseUser,
    textScanner
);



export default textRoutes;