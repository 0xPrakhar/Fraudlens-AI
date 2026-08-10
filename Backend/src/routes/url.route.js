import { Router } from "express";
const urlRoutes = Router()
import { verifyFirebaseUser } from "../middlewares/auth.middleware.js";
import {urlScanner} from "../controllers/url.controller.js"



router.post(
    "/url",
    verifyFirebaseUser,
    urlScanner
);




export default urlRoutes;