import User from "@/entities/User";
import { createUser } from "../../factories/userFactory";
import jwt from "jsonwebtoken";
import { createSession } from "../../factories/sessionFactory";

export async function createAuthenticatedUser() {
  await createUser();
  const user = await User.findOne();

  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET
  );
  
  await createSession(user.id, token);

  return { userId: user.id, token };
}
