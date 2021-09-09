import supertest from "supertest";
import jwt from "jsonwebtoken";

import app, { init } from "@/app";
import Setting from "@/entities/Setting";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import User from "@/entities/User";
import Session from "@/entities/Session";
import Ticket from "@/entities/Ticket";
import httpStatus from "http-status";
import faker from "faker";
import { boolean, number } from "joi";

const agent =  supertest(app);
let settings = null;

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
  settings = await createBasicSettings();
});

afterAll(async () => {
  await clearDatabase();
  await endConnection();
});

describe("POST /ticket", () => {
  it("returns 200 for valid params", async () => {
    const userData = await User.createNew(faker.internet.email(), "1234567");

    const token = jwt.sign({
      userId: userData.id
    }, process.env.JWT_SECRET);

    const sessionData = await Session.createNew(userData.id, token);

    const ticketData = {
      userId: sessionData.userId,
      isPresential: true,
      isHotel: true,
      isPaid: true
    };

    const response = await agent.post("/ticket").send(ticketData).set("Authorization", `Bearer ${sessionData.token}`);
    expect(response.statusCode).toEqual(httpStatus.CREATED);
  });

  it("returns 401 for wrong token", async () => {
    const ticketData = {
      userId: 1,
      isPresential: true,
      isHotel: true,
      isPaid: true
    };

    const response = await agent.post("/ticket").send(ticketData).set("Authorization", "Bearer token");
    expect(response.statusCode).toEqual(401);
  });

  it("returns 422 for invalid params", async () => {
    const userData = await User.createNew(faker.internet.email(), "1234567");

    const token = jwt.sign({
      userId: userData.id
    }, process.env.JWT_SECRET);

    const sessionData = await Session.createNew(userData.id, token);

    const ticketData = {
      userId: sessionData.userId,
      isPresential: 123,
      isHotel: 123,
      isPaid: 123
    };

    const response = await agent.post("/ticket").send(ticketData).set("Authorization", `Bearer ${sessionData.token}`);
    expect(response.statusCode).toEqual(422);
  });
});

describe("GET /ticket", () => {
  it("returns 200 for valid params", async () => {
    const userData = await User.createNew(faker.internet.email(), "1234567");

    const token = jwt.sign({
      userId: userData.id
    }, process.env.JWT_SECRET);

    const sessionData = await Session.createNew(userData.id, token);

    const response = await agent.get("/ticket").set("Authorization", `Bearer ${sessionData.token}`);
    expect(response.statusCode).toEqual(200);
  });

  it("returns 401 for wrong token", async () => {
    const response = await agent.get("/ticket").set("Authorization", "Bearer wrong token");
    expect(response.statusCode).toEqual(401);
  });

  it("returns a object with ticket format", async () => {
    const userData = await User.createNew(faker.internet.email(), "1234567");

    const token = jwt.sign({
      userId: userData.id
    }, process.env.JWT_SECRET);

    const sessionData = await Session.createNew(userData.id, token);

    const ticketData = {
      userId: sessionData.userId,
      isPresential: true,
      isHotel: true,
      isPaid: true
    };

    await Ticket.saveTicket(ticketData);

    const response = await agent.get("/ticket").set("Authorization", `Bearer ${sessionData.token}`);
    expect(response.body).toEqual(expect.objectContaining({
      userId: expect.any(Number),
      isPresential: expect.any(Boolean),
      isHotel: expect.any(Boolean),
      isPaid: expect.any(Boolean)
    }));
  });
});

