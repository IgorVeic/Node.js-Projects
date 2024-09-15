import { Router } from "express";
import { AdoptionController } from "../controllers/adoption.controller.js";

export const adoptionsRouter = new Router();

adoptionsRouter.get("/", AdoptionController.getAllAdoptions);
adoptionsRouter.post("/", AdoptionController.createAdoption);
adoptionsRouter.delete("/:id", AdoptionController.deleteAdoption);
