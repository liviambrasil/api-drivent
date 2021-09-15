import jwt from "jsonwebtoken";

import UnauthorizedError from "@/errors/Unauthorized";
import User from "@/entities/User";
import createRedisClient from "../../redis";

export async function signIn(email: string, password: string) {
  const user = await User.findByEmailAndPassword(email, password);

  if (!user) {
    throw new UnauthorizedError();
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET
  );

  const redisClient = createRedisClient();
  await redisClient.set(token, user.id, "EX", 3600);
  await redisClient.endConnection();

  return {
    user: {
      id: user.id,
      email: user.email,
    },
    token,
  };
}
