import express from "express";
import { register, login, logout, refreshAccessToken, } from "../controllers/auth.controller.js";
// import { protectRoute } from "../middlewares/protectRoutes.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshAccessToken);

export default router;