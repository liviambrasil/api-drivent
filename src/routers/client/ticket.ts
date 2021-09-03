import { Router } from "express";

import * as controller from "@/controllers/client/ticket";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";
import ticketSchema from "@/schemas/ticketSchema";

const router = Router();

router.post("/", schemaValidatingMiddleware(ticketSchema), controller.saveTicket);

export default router;
