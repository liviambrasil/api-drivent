import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/hotel";
import Room from "@/entities/Room";

export async function get(_req: Request, res: Response) {
  const hotels = await service.getAll();
  console.log(hotels);

  res.status(httpStatus.CREATED).send(hotels);
}

export async function getRooms(req: Request, res: Response) {
  const hotelId = parseInt(req.params.hotelId);

  if (isNaN(hotelId)) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  const rooms = await Room.find({ hotelId });

  res.send(rooms);
}
