import { User } from "../entity";
import { prisma } from "@/shared";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({ where: { email } });

  return user;
};