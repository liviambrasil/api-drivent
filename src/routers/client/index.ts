import { Router } from "express";

import eventRouter from "@/routers/client/event";
import userRouter from "@/routers/client/user";
import authRouter from "@/routers/client/auth";
import enrollmentRouter from "@/routers/client/enrollment";
import ticketRouter from "@/routers/client/ticket";
import activityRouter from "@/routers/client/activity";
import eventDaysRouter from "@/routers/client/eventDay";
import locationsRouter from "@/routers/client/locations";

import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/enrollments", tokenValidationMiddleware, enrollmentRouter);
router.use("/ticket", tokenValidationMiddleware, ticketRouter);
router.use("/activity", tokenValidationMiddleware, activityRouter);
router.use("/eventDays", tokenValidationMiddleware, eventDaysRouter);
router.use("/locations", tokenValidationMiddleware, locationsRouter);

export default router;
