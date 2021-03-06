import { Router } from "express";

import * as controller from "@/controllers/client/hotel";

const router = Router();

router.get("/", controller.get);

router.get("/:hotelId/rooms", controller.getRooms);

router.post("/reservation/:roomId", controller.saveReservation);

router.get("/reservation", controller.getReservation);

export default router;
