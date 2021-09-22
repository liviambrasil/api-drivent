import { Request, Response } from "express";

import * as service from "@/services/client/activity";
import httpStatus from "http-status";

export async function getActivities(req: Request, res: Response) {
  const activities = await service.getActivities();
  res.send(activities).status(200);
}

export async function getUserActivities(req: Request, res: Response) {
  const activities = await service.getActivitiesByUserId(req.user.id);

  res.send(activities).status(200);
}

export async function saveUserActivities(req: Request, res: Response) {
  const activityId = parseInt(req.params.activityId);

  if (isNaN(activityId)) return res.sendStatus(httpStatus.BAD_REQUEST);

  const result = await service.saveUserActivity(req.user.id, activityId);

  if (result.error === "invalidId") {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  if (result.error === "conflict") {
    return res.sendStatus(httpStatus.CONFLICT);
  }
  res.sendStatus(httpStatus.CREATED);
}
