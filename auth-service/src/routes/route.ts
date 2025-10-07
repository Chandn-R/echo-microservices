import express from "express";
import { signup, login, logout, refreshAccessToke } from "../controllers/auth.controller.js";
// import { protectRoute } from "../middlewares/protectRoutes.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", protectRoute, logout);
router.post("/refresh", refreshAccessToken);

export default router;