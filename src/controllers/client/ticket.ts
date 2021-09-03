import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/ticket";

export async function saveTicket(req: Request, res: Response) {
  await service.createNewTicket(req.body);
  res.status(httpStatus.CREATED);
}
