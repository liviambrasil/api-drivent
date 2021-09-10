import { Router } from "express";

import * as controller from "@/controllers/client/eventDay";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";
import ticketSchema from "@/schemas/ticketSchema";
import enventDaySchema from "@/schemas/enventDaySchema";

const router = Router();

router.get("/", schemaValidatingMiddleware(ticketSchema), controller.getDays);

router.post("/", schemaValidatingMiddleware(enventDaySchema), controller.addNewDay);

export default router;
