import jwt from "jsonwebtoken";

import UnauthorizedError from "@/errors/Unauthorized";
import User from "@/entities/User";
import Session from "@/entities/Session";

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

  const session = await Session.createNew(user.id, token);

  delete user.reservation.id;
  delete user.reservation.userId;

  return {
    user: {
      id: user.id,
      email: user.email,
      reservation: user.reservation,
    },

    token,
  };
}
