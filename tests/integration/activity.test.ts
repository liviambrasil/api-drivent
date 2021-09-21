import supertest from "supertest";
import app, { init } from "@/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createActivity } from "../factories/activityFactory";
import Activity from "@/entities/Activity";
import { createAuthenticatedUser } from "./utils/createAuthenticatedUser";

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

describe("GET /activity", () => {
  it("Returns an array of activities if there is in database", async () => {
    const activityInfo = await createActivity();

    const response = await agent
      .get("/activity")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        end: expect.any(Date),
        start: expect.any(Date),
        name: expect.any(String),
        vacancies: expect.any(Number),
      },
    ]);
  });
});