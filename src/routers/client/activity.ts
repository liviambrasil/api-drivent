import { Router } from "express";

import * as controller from "@/controllers/client/activity";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";
import ticketSchema from "@/schemas/ticketSchema";

const router = Router();

router.get("/", controller.getActivities);

export default router;
