import createRedisClient from "../../redis";

export async function findSessionByToken(token: string) {
  const redisClient = createRedisClient();
  const userId = await redisClient.get(token);
  await redisClient.endConnection();

  const result = { userId } as { userId: number; token: string };

  if (userId !== null) {
    result.token = token;
  }

  return result;
}
