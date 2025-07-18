import express from "express";
import { registerUser } from "../controllers/auth.controllers.js";
import {loginUser} from "../controllers/auth.controllers.js"

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

export default router;
