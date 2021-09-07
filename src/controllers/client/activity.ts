import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/activity";

export async function getActivities(req: Request, res: Response) {
  console.log("chegou no controller");
  const activities = await service.getActivities();
  res.send(activities).status(200);
}
