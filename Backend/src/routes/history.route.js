import { Router } from "express";
import {verifyFirebaseUser} from '../middleware/auth.middlewar.js'
import {
    getAllHistory,
    getHistoryById,
    deleteHistory,
    deleteUser
} from '../controllers/histroy.controller.js'

const historyRoutes = Router();


historyRoutes.get(
    "/",
    verifyFirebaseUser,
    getAllHistory
);

historyRoutes.get(
    "/:id",
    verifyFirebaseUser,
    getHistoryById
);

historyRoutes.delete(
    "/:id",
    verifyFirebaseUser,
    deleteHistory
);

historyRoutes.delete(
    "/user/:id",
    verifyFirebaseUser,
   deleteUser,
);


export default historyRoutes;