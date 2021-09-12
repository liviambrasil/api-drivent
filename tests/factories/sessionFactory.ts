import Session from "@/entities/Session";
import { emitWarning } from "process";

export async function createSession(userId: number, token: string) {
  const session = await Session.createNew(userId, token);
  await session.save();
  return session
}
