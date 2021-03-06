import supertest from "supertest";
import jwt from "jsonwebtoken";
import "@/setup";
import app, { init } from "@/app";
import Setting from "@/entities/Setting";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import User from "@/entities/User";
import Session from "@/entities/Session";
import Ticket from "@/entities/Ticket";
import httpStatus from "http-status";
import EventDay from "@/entities/EventDay";
import faker from "faker";
import { boolean, number, string } from "joi";
import dayjs from "dayjs";
import {generateToken} from "../factories/token"
import {createUser} from "../factories/userFactory"
import {createSession} from "../factories/sessionFactory"

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


describe("GET /EventDays", () => {
    it("returns 200 for valid params", async () => {
      const userData = await createUser();
      
      const token = await generateToken(userData.id)
      
      const sessionData = await createSession(userData.id, token);
    
      const response = await agent.get("/eventDays").set("Authorization", `Bearer ${sessionData.token}`);
      
      expect(response.statusCode).toEqual(200);
    });

    it("returns correct object format", async () => {
        const userData = await createUser();
    
        const token = await generateToken(userData.id)
    
        const sessionData = await createSession(userData.id, token);

        let date = faker.date.between("2010-12-10", "2016-12-25")
        const stringDate = dayjs(date).toISOString()
        
        await EventDay.addNewDay(stringDate)
        
        const response = await agent.get("/eventDays").set("Authorization", `Bearer ${sessionData.token}`);
       
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id:expect.any(Number),
                    dayInfo:expect.any(String)
                   })
            ])
            
          
          );
      });
  });
