import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/eventDay";

export async function getDays(req: Request, res: Response) {
  const Days = await service.getDays();
  res.send(Days).status(200);
}

export async function addNewDay(req: Request, res: Response) {
  if(await service.addNewDay(req.body.date)) {
    res.status(200);
  }else{
    res.status(400);
  }
}
