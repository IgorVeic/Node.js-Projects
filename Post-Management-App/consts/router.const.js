import { Router } from "express";
import postsRouter from "../routes/posts.routes.js";
import authRouter from "../routes/auth.routes.js";
import { authSession } from "./sessions.const.js";
import validateAuthSession from "../middleware/auth-session-validator.middleware.js";

// Main Router
const router = Router();

// /api
router.use("/auth", authSession, authRouter);
router.use("/posts", authSession, validateAuthSession, postsRouter);

export default router;
