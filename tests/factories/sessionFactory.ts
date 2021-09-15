import createRedisClient from "../../src/redis";
export async function createSession(userId: number, token: string) {
  const redisClient = createRedisClient();
  await redisClient.set(token, userId, "EX", 3600);
  redisClient.endConnection();

  return { userId, token };
}
