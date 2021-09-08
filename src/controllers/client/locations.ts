import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/location";

export async function getLocations(req: Request, res: Response) {
  console.log("chegou no controller");
  const locations = await service.getLocations();
  res.send(locations).status(200);
}

// export async function addNewDay(req: Request, res: Response) {
//   if(await service.addNewDay(req.body.date)) {
//     res.status(200);
//   }else{
//     res.status(400);
//   }
// }
