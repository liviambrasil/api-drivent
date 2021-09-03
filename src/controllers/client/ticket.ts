import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/ticket";

export async function saveTicket(req: Request, res: Response) {
  try{
    await service.createNewTicket(req.body);
    res.sendStatus(httpStatus.CREATED);
  }
  catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
}
