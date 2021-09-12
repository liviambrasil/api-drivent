import { Request, Response } from "express";

import * as service from "@/services/client/activity";

export async function getActivities(req: Request, res: Response) {
  console.log("chegou controler atividade");
  const activities = await service.getActivities();
  res.send(activities).status(200);
}

