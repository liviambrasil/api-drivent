import { Router } from "express";

import * as controller from "@/controllers/client/activity";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";
import ticketSchema from "@/schemas/ticketSchema";

const router = Router();

router.get("/", controller.getActivities);

router.get("/acquired", controller.getUserActivities);

router.post("/acquired/:activityId", controller.saveUserActivities);

export default router;
