import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/hotel";

export async function get(_req: Request, res: Response) {
  const hotels = await service.getAll();
  console.log(hotels);

  res.status(httpStatus.CREATED).send(hotels);
}
