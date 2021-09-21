import supertest from "supertest";
import "@/setup";
import app, { init } from "@/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createHotel } from "../factories/hotelFactory";
import httpStatus from "http-status";
import Hotel from "@/entities/Hotel";
import Room from "@/entities/Room";
import Reservation from "@/entities/Reservation";
import { createRoom } from "../factories/roomFactory";
import { createAuthenticatedUser } from "./utils/createAuthenticatedUser";
import { createReservation } from "../factories/reservationFactory";

const agent = supertest(app);
let token: string;
let userId: number;

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();

  const authenticatedUserData = await createAuthenticatedUser();
  token = authenticatedUserData.token;
  userId = authenticatedUserData.userId;
});

afterAll(async () => {
  await clearDatabase();
  await endConnection();
});

describe("GET /hotels", () => {
  it("Returns an array of hotels if there is hotel", async () => {
    const hotelInfo = await createHotel();

    const response = await agent
      .get("/hotels")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        ...hotelInfo,
        availableRooms: 0,
      },
    ]);
  });

  it("Returns an empty array if there is no hotel", async () => {
    const response = await agent
      .get("/hotels")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toEqual([]);
  });
});

describe("GET /hotels/:hotelId/rooms", () => {
  it("returns bad request if hotel id is invalid", async () => {
    const response = await agent
      .get("/hotels/test/rooms")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(httpStatus.BAD_REQUEST);
  });

  it("it returns an array of rooms from a specific hotel if hotel id is valid", async () => {
    const { id: hotelId } = await createHotel();

    await createHotel();

    const expectedRoomsArray = [
      { ...(await createRoom(hotelId)), id: expect.any(Number) },
      { ...(await createRoom(hotelId)), id: expect.any(Number) },
    ];

    await createRoom(hotelId + 1);

    const response = await agent
      .get(`/hotels/${hotelId}/rooms`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toEqual(expectedRoomsArray);
  });
});

describe("POST /hotels/reservation/:roomId", () => {
  it("returns bad request if room id is invalid", async () => {
    const response = await agent
      .post("/hotels/reservation/test")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(httpStatus.BAD_REQUEST);
  });

  it("it saves a reservation if room id is valid", async () => {
    const { id: hotelId } = await createHotel();

    const { id: roomId } = await createRoom(hotelId);

    const reservationBeforeRequest = await Reservation.findOne();

    await agent
      .post(`/hotels/reservation/${roomId}`)
      .set("Authorization", `Bearer ${token}`);

    const reservationAfterRequest = await Reservation.findOne();

    expect(reservationBeforeRequest).toEqual(undefined);
    expect(reservationAfterRequest).toEqual({
      id: expect.any(Number),
      roomId,
      userId,
    });
  });
});

describe("GET /hotels/reservation", () => {
  it("returns an empty object if there is no reservation", async () => {
    const response = await agent
      .get(`/hotels/reservation`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toEqual({});
  });

  it("it returns the correct reservation info", async () => {
    const {
      id: hotelId,
      name: hotelName,
      image: hotelImage,
    } = await createHotel();

    const {
      id: roomId,
      number: roomNumber,
      maxOccupation,
      currentOccupation,
    } = await createRoom(hotelId);

    await createReservation(userId, roomId);

    const response = await agent
      .get(`/hotels/reservation`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toEqual({
      roomNumber,
      maxOccupation,
      currentOccupation,
      hotelName,
      hotelImage,
    });
  });
});
