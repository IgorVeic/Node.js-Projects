import { Router } from "express";
import { animalsRouter } from "../routes/animal.router.js";
import { adoptionsRouter } from "../routes/adoption.router.js";

export const globalRouter = Router();

globalRouter.use("/animals", animalsRouter);
globalRouter.use("/adoptions", adoptionsRouter);
